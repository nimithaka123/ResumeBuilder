import { writable } from "svelte/store";

export const basicDetailsData = writable({
    first_name: '',
    last_name: '',
    designation: '',
    dob: '',
    email: '',
    phone: '',
    address: {
        city: '',
        country: '',
        pincode: ''
    },
    education : [],
    work_experience: [],
    skills: [],
    certifications: [],
    social_media_profile: []
})

export function updateBasicDetails(data) {
    basicDetailsData.set(data)
}
