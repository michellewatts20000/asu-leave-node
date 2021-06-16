const entryFormHandler = async (personal, annual, long) => {
  const name = document.querySelector('#name-entry').value.trim();
  const phone = document.querySelector('#phone-entry').value.trim();
  const post = document.querySelector('#post-entry').value.trim();
  const employer = document.querySelector('#employer-entry').value.trim();
  const email = document.querySelector('#email-entry').value.trim();
  const sector = document.querySelector('#sector-entry').value;
  const years = document.querySelector('#years').value;
  const union = document.querySelector(
    'input[name="unionOptions"]:checked'
  ).value;
  const shift = document.querySelector(
    'input[name="shiftOptions"]:checked'
  ).value;

  if (email && sector && years) {
    const response = await fetch('/api/entry', {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        post,
        employer,
        email,
        sector,
        years,
        union,
        shift,
        personal,
        annual,
        long

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      document.location.href = `/results/${responseBody.entryResult.id}`;
    } else {
      alert(response.statusText);
    }
  }
};

const calculate = async () => {
  const name = document.querySelector('#name-entry').value.trim();
  const phone = document.querySelector('#phone-entry').value.trim();
  const post = document.querySelector('#post-entry').value.trim();
  const employer = document.querySelector('#employer-entry').value.trim();
  const email = document.querySelector('#email-entry').value.trim();
  const sector = document.querySelector('#sector-entry').value;
  const years = document.querySelector('#years').value;
  const union = document.querySelector(
    'input[name="unionOptions"]:checked'
  ).value;
  const shift = document.querySelector(
    'input[name="shiftOptions"]:checked'
  ).value;

  event.preventDefault();

  console.log(
    name,
    phone,
    post,
    employer,
    email,
    sector,
    years,
    union,
    shift,
  );


  if (shift === "noshift") {
    let annual = years * 4;
    let personal = years * 10;
    let long = years * 0.8;
    return entryFormHandler(
      annual, personal, long
    );
  } else {
    let annual = (years * 4) + 1;
    let personal = years * 10;
    let long = years * 0.8;
    return entryFormHandler(
      annual, personal, long
    );

  }

};

document.querySelector('#entry-form').addEventListener('submit', calculate);