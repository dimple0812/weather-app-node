const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const successField = document.querySelector('#success-output') // selecting the form element
const errorField = document.querySelector('#error-output')

successField.textContent = ''
errorField.textContent = ''

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    let address = searchValue.value
    successField.textContent = 'Loading ...'
    fetch('http://localhost:3000/weather?address='+address)
    .then((res) => {
        res.json().then((data) => {
            if(data.err){
                successField.textContent = ''
                errorField.textContent = data.err
            }
            else{
                errorField.textContent = ''
                successField.textContent = data.location + ', ' + data.forecast_data
                
            }
            
        })
    })

    
})