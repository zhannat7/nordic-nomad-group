import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Get applications older than 30 days
    const { data: oldApps, error: fetchError } = await supabaseAdmin
      .from('applications')
      .select('id, user_id')
      .lt('created_at', thirtyDaysAgo.toISOString())

    if (fetchError) throw fetchError
    if (!oldApps || oldApps.length === 0) {
      return new Response(JSON.stringify({ message: 'No old applications found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const requiredDocs = ['passport.pdf', 'english_certificate', 'enrollment_letter', 'transcript']
    const deletedUsers: string[] = []

    for (const app of oldApps) {
      // Check if all required docs exist
      const { data: files } = await supabaseAdmin.storage
        .from('documents')
        .list(app.user_id)

      const fileNames = (files || []).map(f => f.name)
      const hasAllDocs = requiredDocs.every(doc =>
        fileNames.some(f => f.startsWith(doc.replace('.pdf', '')))
      )

      if (!hasAllDocs) {
        // Delete storage files
        if (files && files.length > 0) {
          const filePaths = files.map(f => `${app.user_id}/${f.name}`)
          await supabaseAdmin.storage.from('documents').remove(filePaths)
        }

        // Delete comments, application, roles
        await supabaseAdmin.from('application_comments').delete().eq('application_id', app.id)
        await supabaseAdmin.from('applications').delete().eq('id', app.id)
        await supabaseAdmin.from('user_roles').delete().eq('user_id', app.user_id)

        // Delete auth user
        await supabaseAdmin.auth.admin.deleteUser(app.user_id)

        deletedUsers.push(app.user_id)
      }
    }

    return new Response(
      JSON.stringify({ message: `Cleaned up ${deletedUsers.length} incomplete profiles`, deletedUsers }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
