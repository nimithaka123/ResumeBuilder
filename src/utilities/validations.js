const customValidation = {
    rules: {
        required: {
            validate: function(input) {
                return input.value.trim() !== ''
            },
            message: 'Required'
        },
        firstLetter: {
            validate: function(input) {
                if(input.value) {
                    const capitalRegex = /^[A-Z]/;
                    return capitalRegex.test(input.value)
                }
                return true
            },
            message: 'First letter should be capital'
        },
        age: {
            validate: function(input) {
                var parts = input.value.split("-");
                let dtDOB = new Date(parts[0] + "-" + parts[1] + "-" + parts[2]); 
                var dtCurrent = new Date()
                return dtCurrent.getFullYear() - dtDOB.getFullYear() >= 18
            },
            message: 'Age must be 18 years or older'
        },
        email: {
            validate: function(input) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(input.value)
            },
            message: 'Please enter a valid email address'
        },
        phone: {
            validate: function(input) {
                const phoneRegrex = /^\d{10}$/
                return phoneRegrex.test(input.value)
            },
            message: 'Please enter a valid mobile number'
        },
        date: {
            validate: function(input) {
                const dateRegrex = /^\d{4}-\d{2}-\d{2}$/
                return dateRegrex.test(input.value)
            },
            message: "Please enter date in YYYY-MM-DD format"
        },
        year: {
            validate: function(input) {
                const yearRegrex = /^(?:19|20)\d{2}$/
                return yearRegrex.test(input.value)
            },
            message: 'Please enter a valid year'
        }
    },
    validate: function (input, rules) {
        const isValid = rules.every(rule => {
            if (!this.rules[rule].validate(input)) {
                this.showError(input, this.rules[rule].message)
                return false
            }
            return true    
        })
        if (isValid) {
            this.clearError(input)
        }
        return isValid
    },
    showError: function(input, message) {
        const errorElementId = input.dataset.error
        const errorElement = document.getElementById(errorElementId)
        if(errorElement) {
            errorElement.textContent = message
            input.classList.add('error')
        }
    },
    clearError: function(input) {
        const errorElementId = input.dataset.error
        const errorElement = document.getElementById(errorElementId)
        if(errorElement) {
            errorElement.textContent = ''
            input.classList.remove('error')
        }
    }

}

export {customValidation}