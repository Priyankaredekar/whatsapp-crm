let currentSender = "919272518967";

loadContacts();
loadMessages();

function loadContacts() {

    fetch("/contacts")
    .then(response => response.json())
    .then(data => {

        let contactList = document.getElementById("contactList");

        contactList.innerHTML = "";

        data.forEach(contact => {

          contactList.innerHTML += `
<div class="contact"
onclick="loadMessages('${contact.phone}')">
    ${contact.name}
</div>
`;

        });

    });

}

function sendMessage() {

    let message = document.getElementById("messageInput").value;

    fetch("/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            sender: currentSender
        })
    })
    .then(response => response.text())
    .then(data => {

    

        document.getElementById("messageInput").value = "";
       
        loadMessages(currentSender);
    });

}

function loadMessages(sender = "919272518967") {

    currentSender = sender;

    document.getElementById("chatHeader").innerText = sender;

    fetch(`/messages/${sender}`)
    .then(response => response.json())
    .then(data => {

        let chatBox = document.getElementById("chatBox");

        chatBox.innerHTML = "";

        data.forEach(msg => {

            if (msg.direction == "sent") {

                chatBox.innerHTML += `
                <div class="sent">
                    ${msg.message}
                </div>
                `;

            } else {

                chatBox.innerHTML += `
                <div class="received">
                    ${msg.message}
                </div>
                `;

            }

        });

        chatBox.scrollTop = chatBox.scrollHeight;

    });

}

setInterval(() => {

    loadMessages(currentSender);
    loadContacts();

}, 3000);