//address class
class Address {
    constructor (name, phone, company, email) {
        this.name = name;
        this.phone = phone;
        this.company = company;
        this.email = email;
    }
}

//ui class
class UI {
    static displayAddresses() {
        const addresses = Store.getAddress();

        addresses.forEach((address) => UI.addAddressToList(address))
    }

    static addAddressToList(address) {
        const list = document.querySelector('#address-list')

        const row = document.createElement ('tr')

        row.innerHTML = `
        <td>${address.name}</td>
        <td>${address.phone}</td>
        <td>${address.company}</td>
        <td>${address.email}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `

        list.appendChild(row)
    }

    //delete book method
    static deleteBook(el){
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    //alert method
    static showAlert(message, className) {
        const div = document.createElement ('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        //alert vanish in 3 seconds
        setTimeout (() => document.querySelector('.alert').remove(),3000)
    }    

    //clear fileds method
    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#company').value = '';
        document.querySelector('#email').value = '';
    }
}

//storage class
class Store {
    static getAddress() {
        let addresses
        if (localStorage.getItem('addresses') == null) {
            addresses = []
        } else {
            addresses = JSON.parse(localStorage.getItem('addresses'))
        }
        return addresses
    }

    static addAddress(address) {
        const addresses = Store.getAddress()
        addresses.push(address)
        localStorage.setItem('addresses', JSON.stringify(addresses))
    }

    static removeAddress(email) {
        const addresses = Store.getAddress()

        addresses.forEach((address, index) => {
            if(address.email == email){
                addresses.splice(index, 1)
            }
        })

        localStorage.setItem('addresses', JSON.stringify(addresses))

    }
}

//display addresses event
document.addEventListener('DOMContentLoaded', UI.displayAddresses)

// add address event
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault()

    //get form address values
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const company = document.querySelector('#company').value;
    const email = document.querySelector('#email').value;

    //validation
    if(name == '' || phone == ''){
        UI.showAlert('Please fill required fileds', 'danger')
    } else {
    //instatiate address
    const address = new Address(name, phone, company, email)

    //add address to ui
    UI.addAddressToList(address)

    //add address to store
    Store.addAddress(address)
    
    //add address success alert
    UI.showAlert('Address Added', 'success')

    //clear fileds
    UI.clearFields()
    }
})

//delete address event
document.querySelector('#address-list').addEventListener ('click', (e) => {
    //remove address from UI
    UI.deleteBook(e.target)
    
    //remove address from store
    Store.removeAddress
    (e.target.parentElement.previousElementSibling.textContent)

    //delete address message
    UI.showAlert('Address removed', 'info')
})



