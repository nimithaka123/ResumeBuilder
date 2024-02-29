import { writable } from "svelte/store";

export const basicDetailsData = writable({
    first_name: '',
    last_name: '',
    designation: '',
    dob: '',
    email: '',
    phone: '',
    summary: '',
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

basicDetailsData.subscribe(value => {
    console.log('Store value changed:', value);
});

export function updateBasicDetails(data) {
    basicDetailsData.set(data)
}

export function clearDetails(data = null) {
    basicDetailsData.set(data)
}