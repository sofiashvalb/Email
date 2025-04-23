document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // when composed mail is submited
  document.querySelector('#compose-form').addEventListener('submit', send_mail);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#show-email').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


// Function for clicked email
function view_email(id) {
  console.log(id);

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#show-email').style.display = 'block';

  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
      // Print email
      console.log(email);

      // Get current mailbox to determine if button should be shown
      const currentMailbox = document.querySelector('#emails-view h3').innerText.toLowerCase();

      // show the email content in different <div>
      document.querySelector('#show-email').innerHTML = `
        <p><b>From: </b> ${email.sender}<br>
        <b>To: </b> ${email.recipients}<br>
        <b>Subject: </b> ${email.subject}<br>
        <b>Timestamp: </b> ${email.timestamp}</p>
        <hr>
        <p>${email.body}</p>
        `;

      // Archive/Unarchive
      if (currentMailbox !== 'sent') {
        const btn = document.createElement('button');
        // if the email is archived - then false, otherwise true
        btn.innerHTML = `${email.archived ? "Unarchive" : "Archive"}`;
        btn.className = email.archived ? "btn btn-success arc" : "btn btn-warning arc";
        btn.addEventListener('click', function() {
            console.log('This element has been clicked!')

            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  archived: !email.archived
              })
            })
            .then(()=> {load_mailbox('inbox')});
        });
        
        document.querySelector('#show-email').append(btn);   
      }    
      
      //add event handler to the reply button
      const reply = document.createElement('button');
      reply.innerHTML = 'Reply';
      reply.className = "btn btn-info";
      reply.addEventListener('click', function() {
        console.log('This element has been clicked!')
        compose_email();

        document.querySelector('#compose-recipients').value = `${email.sender}`;

        let subject = email.subject;
        if (!subject.startsWith('Re:')) {
          subject = `Re: ${subject}`;
        } 

        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;

      });
      document.querySelector('#show-email').append(reply);
  });

}

function load_mailbox(mailbox) { 
  

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#show-email').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //show emails for specific mailbox 
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      console.log(emails);

      // for each email its own div
      emails.forEach(email => {
        console.log(email);

        const element = document.createElement('div');
        element.className = "list-group-item";
        element.innerHTML = `
        <div class="view">
          <span><b>${email.sender} </b> -> ${email.subject}</span>
          <h6>${email.timestamp}</h6>
        </div>
        `;

        // check if mail been read and change color (true=gray false=white)
         
         if (email.read == true) {
          element.className = "read";   
         } else {
          element.className = "unread";
         }
        
        // view clicked email 
        element.addEventListener('click', function() {

          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          })

          view_email(email.id)

        });
        document.querySelector('#emails-view').append(element);
      })

  });

}


// Function for sending mail
function send_mail(event) {
  event.preventDefault();

  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // send data to the backend
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent')
  });

}



