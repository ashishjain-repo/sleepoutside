
async function getAlerts() {
  let alerts = await fetch('/json/alerts.json');
  alerts = await alerts.json();

  if (alerts.length > 0) {
    // Convert alerts to html.
    const alertsHTML = alerts
      .map(
        (alert) =>
          `<p style="color:${alert.color};background-color:${alert.background}">${alert.message}</p>`,
      )
      .join('');

    // Insert them into the page.
    document.getElementById('content').insertAdjacentHTML(
      'afterbegin',
      `
        <section class="alert-list">
            ${alertsHTML}
        </section>
        `,
    );
  }
}

getAlerts();
