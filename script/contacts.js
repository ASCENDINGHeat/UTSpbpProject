const contacts = {
    "customerSupport": {
        name: "John Doe",
        role: "Customer Support",
        email: "john.doe@email.com",
        phone: "+1 234 567 8901",
    },
    "businessInquiries": {
        name: "Jane Smith",
        role: "Business Inquiries",
        email: "jane.smith@email.com",
        phone: "+1 987 654 3210",
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const contactName = urlParams.get('name');

    if (contactName && contacts[contactName]) {
        const contact = contacts[contactName];
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        if (nameField) nameField.value = contact.name;
        if (emailField) emailField.value = contact.email;
        if (messageField) messageField.value = `Hello ${contact.role},`;
    }
});