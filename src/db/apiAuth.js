// All our auth logic is here

import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({  // This returns 2 things
        email,
        password
    })

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export async function getCurrentUser() {        // This will get Current User from local Storage and show it
    const { data: session, error } = await supabase.auth.getSession()
    // We can also use database instead of relying on local Storage also by getUser()
    if (!session.session) return null;
    if (error) throw new Error(error.message)

    return session.session?.user
}

export async function signup({ name, email, password, profilepic }) {

    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;     // Math.random() ensures that users are different

    const { error: StorageError } = await supabase.storage
        .from("profilepic")
        .upload(fileName, profilepic)

    if (StorageError) throw new Error(StorageError.message)

    const profilepicURL = `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`

    const { data, error: AuthError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profilepic: profilepicURL
            }
        }
    })

    if (AuthError) throw new Error(AuthError.message)

    return data;
}