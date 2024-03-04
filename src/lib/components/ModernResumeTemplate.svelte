<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import {basicDetailsData} from '../../store/resume.js'
    // import SocialMediaProfile from './SocialMediaProfile.svelte';
    import TemplateChoice from './TemplateChoice.svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';		
    initializeStores();
    const modalStore = getModalStore();

    let candidateDetails = $basicDetailsData
    let showTemplateChoice = false

    let html2pdf

    onMount(async () => {
        try {
            const module = await import('html2pdf.js')
            html2pdf = module.default
        }
        catch(error) {
            console.log('Error importing html2pdf', error)
        }
    })

    async function formSubmit() {
        if(candidateDetails?.id) {
        try {
            let updatedData = $basicDetailsData
            const response = await axios.put(`http://localhost:5173/api/${updatedData.id}`, updatedData)
            if(response.status === 200) {
                alertMessage('Saved', 'Successfully Saved')
            }
            else {
                alertMessage('error', 'Oops, something went wrong')
            }
        }
        catch(error) {
          alertMessage('error', 'Oops, something went wrong')
          console.log('error', error);
        }
        }   
        else {
            try {
                const response = await axios.post(`http://localhost:5173/api`, candidateDetails)
                if(response.status === 200) {
                    alertMessage('Saved', 'Successfully Saved')
                }
                else {
                    alertMessage('error', 'Oops, something went wrong')
                }
            }
            catch(error) {
                alertMessage('error', 'Oops, something went wrong')
                console.log('error', error); 
      }
        }    
    }

    function alertMessage(head, message) {
      const modal = {
      type: 'alert',
      title: head,
      body: message
      };
      modalStore.trigger(modal);
    }

    function backToForm() {
        showTemplateChoice = true
    }

    function printResume() {
       try {
        let element = document.getElementById('resume-content')
        console.log('element', element);
        html2pdf(element)
       }
       catch(error) {
        console.log('Error while downloading pdf:', error)
       }
    }


    
</script>

    <main>
        {#if showTemplateChoice }
        <TemplateChoice/>
        {:else}
        <div class="flex items-stretch justify-center mt-20">
            <div class="main-page">
                <div id="resume-content" class="flex sub-page">
                    <div class="bg-blue-900 w-1/2 p-10 h-auto left">
                        <div class="flex flex-col mb-5">
                            <h2 class="text-white tracking-widest text-2xl font-extrabold">{candidateDetails.first_name} {candidateDetails.last_name}</h2>
                            <h3 class="text-white text-sm">{candidateDetails.designation}</h3>
                        </div>
                        <h1 class="text-white text-lg font-medium">CONTACT</h1>
                        <h1 class="text-white text-base">Email: {candidateDetails.email}</h1>
                        <h1 class="text-white text-base">Phone: {candidateDetails.phone}</h1>
                        <h1 class="text-white text-base">Address </h1>
                        <p class="text-white text-base">City: {candidateDetails.address.city}</p>
                        <p class="text-white text-base">Pincode: {candidateDetails.address.pincode}</p>
                        <p class="text-white text-base">Country: {candidateDetails.address.country}</p>
                        <hr class="my-5">
                        {#if candidateDetails.skills.length}
                        <div>
                            <h1 class="text-white text-lg font-medium">SKILLS</h1>
                            <ul class="list-disc">
                                {#each candidateDetails.skills as skill, index}
                                <li class="text-white text-base">{skill.skill_name} - {skill.skill_level}</li>
                                {/each}
                            </ul>
                        </div>
                        {/if}
                        <hr class="my-5">
                        {#if candidateDetails.social_media_profile.length}
                        <div>
                            <h1 class="text-white text-lg font-medium">SOCIAL MEDIA</h1>
                            <ul class="list-disc">
                                {#each candidateDetails.social_media_profile as sm, index}
                                <li class="text-white text-sm">{sm.network} - {sm.url}</li>
                                {/each}
                            </ul>
                        </div>
                        {/if}
                    </div>
                    <div class="bg-white w-3/4 p-10">
                        <h1 class="font-semibold">SUMMARY</h1>
                        <p class="text-sm">{candidateDetails.summary}</p>
                        <div class="mt-5">
                            <h1 class="font-semibold">EDUCATION</h1>
                            {#each candidateDetails.education as edu, index}
                            <div class="{index > 0 ? 'mt-3' : ''}">
                                <h1 class="text-gray-600 font-semibold uppercase">{edu.course_name}</h1>
                                <h1 class="text-sm"><span>{edu.institute_name}</span>, <span class="italic">{edu.location}</span> | {edu.start_month} {edu.start_year} - {edu.end_month} {edu.end_year}</h1>
                        </div>
                        {/each}
                        </div>
                        {#if candidateDetails.work_experience.length}
                        <div class="mt-5">
                            <h1 class="font-semibold">EXPERIENCE</h1>
                            {#each candidateDetails.work_experience as exp, index}
                            <div class="{index > 0 ? 'mt-3' : ''}">
                                <h1 class="text-gray-600 font-semibold">{exp.job_title} | {exp.start_month} {exp.start_year} - {exp.end_month} {exp.end_year}</h1>
                                <h1 class="text-gray-600 font-semibold">{exp.employer}</h1>
                                <p class=" text-sm">{exp.job_description}</p>   
                            </div>
                            {/each}
                        </div>
                        {/if}
                        {#if candidateDetails.certifications.length}
                        <div class="mt-5">
                            <h1 class="font-semibold">CERTIFICATIONS</h1>
                            <ul class="list-disc">
                                {#each candidateDetails.certifications as cert, index}
                                <li class="text-sm">
                                    <p>{cert.certificate_name} | {cert.start_year} - {cert.end_year}</p>
                                    <p class="ml-5">{cert.url}</p>
                                </li>
                                {/each}
                            </ul>
                        </div>
                        {/if}    
                    </div>
                </div>
            </div>   
        </div> 
        <div id="btn-group" class="flex justify-center mt-10">
            <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={backToForm}>Back</button>
            <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={formSubmit}>Save</button>
            <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={printResume}>Print</button>
        </div>
        {/if}
        <Modal/> 
    </main>

<style>
.main-page {
  width: 210mm;
  background: white;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
}
.sub-page {
  margin: 0;
  min-height: calc(297mm - 2cm); 
}
.left {
    margin: 0;
    min-height:  calc(297mm - 2mm); 
}
.sub-page, .sub-page * {
    page-break-inside: avoid;
}
</style>