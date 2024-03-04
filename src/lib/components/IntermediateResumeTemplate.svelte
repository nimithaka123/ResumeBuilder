<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { basicDetailsData } from "../../store/resume";
    import TemplateChoice from './TemplateChoice.svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';		
    initializeStores();
    const modalStore = getModalStore();

    let candidateDetails = $basicDetailsData
    let showTemplateChoice = false

    let html2pdf;

    onMount(async () => {
        try {
            const module = await import('html2pdf.js')
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
            console.log('Error while downloading pdf:', error);
        }
    }



</script>

<main>
    {#if showTemplateChoice }
    <TemplateChoice/>
    {:else}
    <div class="main-page">
        <div id="resume-content" class="sub-page">
            <div class="header text-center">
                <h1 class="text-2xl font-extrabold uppercase">{candidateDetails.first_name} {candidateDetails.last_name}</h1>
                <h3 class="text-lg font-normal">{candidateDetails.designation}</h3>
            </div>
                <div class="mt-5">
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white p-4 rounded-r-lg uppercase">Personal Information</h2>
                        <!-- <p class="mt-2">Age:</p> -->
                        <p class="mt-2">Phone: {candidateDetails.phone}</p>
                        <p>Email: {candidateDetails.email}</p>
                        <p>City: {candidateDetails.address.city}</p>
                        <p>Pincode: {candidateDetails.address.pincode}</p>
                        <p>Country: {candidateDetails.address.country}</p>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white p-4 mt-3 rounded-r-lg uppercase">Summary</h2>
                        <p class="mt-2">{candidateDetails.summary}</p>
                    </div>
                    {#if candidateDetails.work_experience.length}
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white p-4 rounded-r-lg mt-5 uppercase">Experience</h2>
                        {#each candidateDetails.work_experience as exp, index}
                            <p class="font-semibold text-cyan-900 mt-2">{exp.employer}</p>
                            <p class="text-cyan-700">{exp.job_title}, {exp.start_month} {exp.start_year} - {exp.end_month} {exp.end_year}</p>
                            <p>{exp.job_description}</p>
                        {/each}
                    </div>
                    {/if}
                    {#if candidateDetails.skills.length}
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white  p-4 rounded-r-lg mt-5 uppercase">Skills</h2>
                        <ul class="list-disc list-inside mt-2">
                            {#each candidateDetails.skills as sk, index}
                            <li>{sk.skill_name} - {sk.skill_level}</li>
                            {/each}
                        </ul>
                    </div>
                    {/if}
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white p-4 rounded-r-lg mt-5 uppercase">Education</h2>
                       <div>
                        {#each candidateDetails.education as edu, index}
                        <h3 class="font-semibold text-cyan-900 mt-2">{edu.course_name}</h3>
                        <p class="text-cyan-700">{edu.institute_name}, {edu.start_month} {edu.start_year} - {edu.end_month} {edu.end_year}</p>
                        {/each}
                       </div>
                    </div>
                    {#if candidateDetails.certifications.length}
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white  p-4 rounded-r-lg mt-5 uppercase">Certificates</h2>
                        <ul class="list-disc list-inside mt-2">
                            {#each candidateDetails.certifications as cert, index}
                            <li>{cert.certificate_name} : : {cert.start_year} - {cert.end_year}</li>
                            {/each}
                        </ul>
                    </div>
                    {/if}
                    {#if candidateDetails.social_media_profile.length}
                    <div>
                        <h2 class="text-normal font-semibold bg-cyan-400 text-white  p-4 rounded-r-lg mt-5 uppercase">Social Media</h2>
                        <ul class="list-disc list-inside mt-2">
                            {#each candidateDetails.social_media_profile as sm, index}
                            <li>{sm.network} : {sm.url}</li>
                            {/each}
                        </ul>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
    <div class="flex justify-center">
        <button type="button" class="border-2 border-gray-400 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={backToForm}>Back</button>
        <button type="button" class="border-2 border-gray-400 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={formSubmit}>Save</button>
        <button type="button" class="border-2 border-gray-400 hover:bg-gray-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40 p-3" on:click={printResume}>Print</button>
    </div>
    {/if}
    <Modal/>     
</main>

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
  background: white;
}
.sub-page {
  padding: 1cm;
  margin: 0;
  min-height: calc(297mm - 2cm);
}
/* #resume-content, #resume-content * {
    page-break-inside: avoid;
} */
</style>