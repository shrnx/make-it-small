// All our auth logic is here

import supabase from "./supabase";

export async function  login({email, password}) {
    const {data, error} = await supabase.auth.signInWithPassword({  // This returns 2 things
        email,
        password
    })

    if(error) {
        throw new Error(error.message)
    }

    return data;
}

export async function getCurrentUser() {        // This will get Current User from local Storage and show it
    const {data :session, error} = await supabase.auth.getSession()
    // We can also use database instead of relying on local Storage also by getUser()
    if(!session.session) return null;
    if(error) throw new Error(error.message)

    return session.session?.user
}