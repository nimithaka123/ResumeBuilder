<main>
    {#if showTemplateChoice }
        <TemplateChoice/>
        {:else}
        <div class="bg-gray-100 text-gray-800">
            <div class="container mx-auto py-10 px-5">
                <div class="main-page">
                    <div id="resume-content" class="sub-page">
                        <div class="items-center justify-between">
                            <div>
                                <h2 class="text-2xl font-bold">{candidateDetails.first_name} {candidateDetails.last_name}</h2>
                                <p class="text-base font-medium">{candidateDetails.designation}</p>
                            </div>
                            <div>
                                <p class="text-sm">Phone: {candidateDetails.phone}</p>
                                <p class="text-sm">Email: {candidateDetails.email}</p>
                                <p class="text-sm">Location: {candidateDetails.address.city}, {candidateDetails.address.pincode}</p>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div>
                            <h3 class="text-md font-semibold mb-2 uppercase">Summary</h3>
                            <p class="text-sm font-normal">{candidateDetails.summary}</p>
                        </div>
                        {#if candidateDetails.work_experience.length}
                            <div class="mt-4">
                                <h3 class="text-md font-semibold mb-2 uppercase">Experience</h3>
                                {#each candidateDetails.work_experience as exp, index}
                                    <div class="{index > 0 ? 'mt-2' : ''}">
                                        <h4 class="text-md text-gray-600 font-semibold">{exp.employer}</h4>
                                        <p class="text-sm">{exp.job_title} | {exp.start_month} {exp.start_year} - {exp.end_month} {exp.end_year}</p>
                                        <p class="text-sm">{exp.job_description}</p>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        <div class="mt-4">
                            <h3 class="text-md font-semibold mb-2 uppercase">Education</h3>
                            {#each candidateDetails.education as edu, index}
                                <div class="{index > 0 ? 'mt-2' : ''}">
                                    <h4 class="text-md text-gray-600 font-semibold">{edu.course_name} | {edu.start_month} {edu.start_year} - {edu.end_month} {edu.end_year}</h4>
                                    <p class="text-sm">{edu.institute_name}, {edu.location}</p>
                                </div>
                            {/each}
                        </div>
                        {#if candidateDetails.skills.length}
                            <div class="mt-4">
                                <h3 class="text-md font-semibold mb-2 uppercase">Skills</h3>
                                <ul class="list-disc list-inside text-sm">
                                {#each candidateDetails.skills as sk, index}
                                    <li>{sk.skill_name} - {sk.skill_level}</li>
                                {/each}
                                </ul>
                            </div>
                        {/if}
                        {#if candidateDetails.certifications.length}
                            <div class="mt-4">
                                <h3 class="text-md font-semibold mb-2 uppercase">Certifications</h3>
                                <ul class="list-disc list-inside text-sm">
                                {#each candidateDetails.certifications as cert, index}
                                    <li>{cert.certificate_name} : {cert.start_year} - {cert.end_year}</li>
                                {/each}
                                </ul>
                            </div>
                        {/if}
                        {#if candidateDetails.social_media_profile.length}
                            <div class="mt-4">
                                <h3 class="text-md font-semibold mb-2 uppercase">Social Media</h3>
                                <ul class="list-disc list-inside text-sm">
                                {#each candidateDetails.social_media_profile as sm, index}
                                    <li>{sm.network} : {sm.url}</li>
                                {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                </div>   
            </div>
            <div id="btn-grp" class="flex justify-center">
                <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={backToForm}>Back</button>
                <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={formSubmit}>Save</button>
                <button type="button" class="border-2 border-gray-400 hover:bg-gray-400  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={printResume}>Print</button>
            </div>
        </div>
        {/if}
    <Modal/> 
</main>

<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { basicDetailsData } from "../../store/resume";
    import TemplateChoice from './TemplateChoice.svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';		
    // import { html2pdf } from 'html2pdf.js';
    initializeStores();
    const modalStore = getModalStore();

    let showTemplateChoice = false

    let candidateDetails = $basicDetailsData

    let html2pdf

    onMount(async () => {
        try {
            const module = await import ('html2pdf.js')
            html2pdf = module.default
        }
        catch(error) {
            console.log('Error importing html2pdf', error);
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
            html2pdf(element)
        }
        catch(error) {
            console.log('Error while downloading pdf:', error)
        }
    }
</script>

<style>
     body {
  width: 230mm;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  font-size: 12pt;
}
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.main-page {
  width: 210mm;
  min-height: 297mm;
  margin: 10mm auto;
  border: 2px solid #B4B4B8;
}
.sub-page {
  padding: 1cm;
  margin: 0;
    min-height: calc(297mm - 2cm); 
}
.sub-page, .sub-page * {
    page-break-inside: avoid;
}
@page {
    size: A4;
    margin: 2.5em;
}

</style>