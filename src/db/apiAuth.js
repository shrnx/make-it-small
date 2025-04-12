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