
<main>
  {#if !showEducation}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Basic Details</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-2 gap-4">
          <label class="label">
            <span>First Name</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="First Name" bind:value={firstName} />
          </label>
          <label class="label">
            <span>Second Name</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Second Name" bind:value={lastName} />
          </label>
            <label class="label">
              <span>Profession</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Profession" bind:value={designation} />
            </label>
            <label class="label">
              <span>Date of Birth</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Date of Birth" bind:value={dob} />
            </label>
          <label class="label">
            <span>City</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="City" bind:value={city}/>
          </label>
          <div class="grid grid-cols-2 gap-4">
            <label class="label">
              <span>Country</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Country" bind:value={country}/>
            </label>
            <label class="label">
              <span>Pin Code</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Pin Code" bind:value={pincode} />
            </label>
          </div>
          <label class="label">
            <span>Phone</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Phone" bind:value={phone}/>
          </label>
          <label class="label">
            <span>Email</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Email" bind:value={email} />
          </label>  
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10">Back</button>
          <button id="button1" type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}>Next</button>
        </div>
      </div>
    </div>
  {:else} 
    <Education/>
  {/if}
</main>
  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Education from "./Education.svelte";
    

    let {first_name, last_name, address} = $basicDetailsData

    let firstName = first_name || ''
    let lastName = last_name || ''
    let designation = $basicDetailsData?.designation || ''
    let dob = $basicDetailsData?.dob || ''
    let city = address?.city || ''
    let country = address?.country || ''
    let pincode = address?.pincode || ''
    let phone = $basicDetailsData?.phone || ''
    let email = $basicDetailsData?.email || ''

    let showEducation = false
    

    function toggleComponent() {
     const basicDetails = JSON.parse(JSON.stringify($basicDetailsData)) 
     basicDetails.first_name = firstName
     basicDetails.last_name = lastName
     basicDetails.dob = dob
     basicDetails.designation = designation
     basicDetails.email = email
     basicDetails.phone = phone
     basicDetails.address.city = city
     basicDetails.address.country = country
     basicDetails.address.pincode = pincode
        updateBasicDetails(basicDetails)
      showEducation = true
    }


  </script>