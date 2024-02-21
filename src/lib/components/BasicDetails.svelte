
<main>
  {#if !showEducation}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Basic Details</h2>
      <div class="form-container mt-5">
        <form  class="grid grid-cols-2 gap-4">
          <label class="label">
            <span>First Name</span>
            <input data-error="firstNameErr" data-rule="['required']" class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="First Name" bind:value={firstName} />
            <span class="err-msg text-xs" id="firstNameErr"></span>
          </label>
          <label class="label">
            <span>Second Name</span>
            <input data-error="lastNameErr" data-rule="['required']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="Second Name" bind:value={lastName} />
            <span class="err-msg text-xs" id="lastNameErr"></span>
          </label>
            <label class="label">
              <span>Profession</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Profession" bind:value={designation} />
            </label>
            <label class="label">
              <span>Date of Birth</span>
              <input data-error="dobErr" data-rule="['required', 'date']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="YYYY-MM-DD" bind:value={dob} />
              <span class="err-msg text-xs" id="dobErr"></span>
            </label>
          <label class="label">
            <span>City</span>
            <input data-error="cityErr" data-rule="['required']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="City" bind:value={city}/>
            <span class="err-msg text-xs" id="cityErr"></span>
          </label>
          <div class="grid grid-cols-2 gap-4">
            <label class="label">
              <span>Country</span>
              <input data-error="countryErr" data-rule="['required']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="Country" bind:value={country}/>
              <span class="err-msg text-xs" id="countryErr"></span>
            </label>
            <label class="label">
              <span>Pin Code</span>
              <input data-error="pincodeErr" data-rule="['required']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="Pin Code" bind:value={pincode} />
              <span class="err-msg text-xs" id="pincodeErr"></span>
            </label>
          </div>
          <label class="label">
            <span>Phone</span>
            <input data-error="phoneErr" data-rule="['required', 'phone']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput}  placeholder="Phone" bind:value={phone}/>
            <span class="err-msg text-xs" id="phoneErr"></span>
          </label>
          <label class="label">
            <span>Email</span>
            <input data-error="emailErr" data-rule="['required', 'email']"  class="input p-3 rounded-lg border validate" type="text" on:blur={validateInput} placeholder="Email" bind:value={email} />
            <span class="err-msg text-xs" id="emailErr"></span>
          </label>  
        </form>
        <div class="flex justify-between">
          <div></div>
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
    import {customValidation} from '../../utilities/validations.js'
    

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

    function validateInput(event) {
      const inputElement = event.target
      const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'))
      customValidation.validate(inputElement,rule)
    }
    

    function toggleComponent() {
     const inputs = document.querySelectorAll('.validate')
     let isValidationPassed = true
     inputs.forEach(input => {
      const rule = JSON.parse(input.dataset.rule.replace(/'/g, '"'))
       if(!customValidation.validate(input,rule)) isValidationPassed = false
     })
      if(isValidationPassed){
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
     
    }
  </script>

  <style>
    :global(.error){
      border: 2px solid #C70039 
    }
    .err-msg {
      color: #C70039; 
    }
  </style>
