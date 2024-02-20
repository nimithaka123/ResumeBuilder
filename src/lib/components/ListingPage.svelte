<Modal />
<div class="table-container flex flex-col justify-center items-center">
  <div>
    <h1 class="text-4xl mt-5">Resumes</h1>
  </div>
  <table class="border-2 border-gray-900 w-1/2 mt-5">
    <thead class="text-white">
      <tr>
        <th class="py-3 bg-black">S. NO</th>
        <th class="py-3 bg-black">Name</th>
        <th class="py-3 bg-black">Profession</th>
        <th class="py-3 bg-black">Email</th>
        <th class="py-3 bg-black">Phone</th>
        <th class="py-3 bg-black">Actions</th>
      </tr>
    </thead>
    <tbody class="text-center">
      {#each responseData as data, i}
        <tr class="bg-gray-200 hover:bg-gray-100">
          <td class="py-3">{i+1}</td>
          <td class="py-3">{data.first_name} {data.last_name}</td>
          <td class="py-3">{data.designation}</td>
          <td class="py-3">{data.email}</td>
          <td class="py-3">{data.phone}</td>
          <td>
            <button class="border-2 border-blue-800 rounded-lg w-24" on:click={() => editResume(data.id)}>Edit</button>
            <button class="border-2 border-blue-800 rounded-lg w-24 ml-3" on:click={confirmation(data.id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>


<script>
  import axios from "axios";
  import {goto} from '$app/navigation'
  import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
  import { onMount } from "svelte";

  import { Modal, getModalStore } from '@skeletonlabs/skeleton';
  import { initializeStores } from '@skeletonlabs/skeleton';		
  initializeStores();
  const modalStore = getModalStore();

  let responseData = []
  onMount(async () => {
    getBasicDetails()
  })


async function deleteResume(id) {
  console.log('id', id)
  try {
    const response = await axios.delete(`http://localhost:5173/api/${id}`)
    if(response.data.id) {
      getBasicDetails()
      alertMessage()
    }
  }
  catch (error) {
    console.log(error)
  }
}
async function getBasicDetails() {
  try{
      const response = await axios.get('http://localhost:5173/api')
      responseData = response. data
      console.log('responseData', responseData)
    }
    catch(error) {
      console.log('error',error)
    }
}

async function editResume(id) {
  try{
    const response = await axios.get(`http://localhost:5173/api/${id}`)
    updateBasicDetails(response?.data)
    console.log('response', response.data, 'store', $basicDetailsData)
    goto('/resume')

  }
  catch(error) {
    console.log('error', error);
  }
}
function confirmation(id) {
  const modal = {
      type: 'confirm',
      title: 'Please Confirm',
      body: 'Are you sure you wish to proceed?',
      response: (r) => {
        if(r) deleteResume(id)
      },
    };
    modalStore.trigger(modal);
}
function alertMessage() {
  const modal = {
	type: 'alert',
	title: 'Alert Message',
	body: 'Deleted Successfully'
};
modalStore.trigger(modal);
}


</script>
