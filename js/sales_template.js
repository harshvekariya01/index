document.addEventListener('DOMContentLoaded', function() {
    fetch(`${BASE_URL}/sales/customer`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('company-name-select');
            data.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id; // Use a unique identifier
                option.textContent = item.name; // Assuming 'name' is the field containing company names
                const today = new Date();
                 const formattedDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                document.getElementById('sale_date_id').value = formattedDate;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));

    // Handle form submission
    const form = document.getElementById('vendor-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const companySelect = document.getElementById('company-name-select');
        const companyDate = document.getElementById('sale_date_id');
        const selectedCompanyId = companySelect.value;
        const selectedDate = companyDate.value;

        if (selectedCompanyId) {
            fetch(`${BASE_URL}/sales/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Add CSRF token for security
                },
                body: JSON.stringify({ company: selectedCompanyId, date: selectedDate })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log('Success:', data);
                var element = document.getElementById('thanks_div');
                var form_contet = document.getElementById('form_content');
                if (element) {
                    if (element.style.display === 'none') {
                        element.style.display = 'block';
                        form_contet.style.display = 'none';
                    }
                }

                // window.location.href = 'sale_order.html'; // Redirect to a success page
            })
            .catch(error => {
                
                var element = document.getElementById('error_div');
            
                if (element) {
                    if (element.style.display === 'none') {
                        element.style.display = 'block';
                    }
                }
            });
        } else {
            console.error('No company selected');
        }
    });
});

// Function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
