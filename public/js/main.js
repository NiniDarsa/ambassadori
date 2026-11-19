import { startCountdown, renderCampaign } from "./render.js";

async function loadCampaign() {
  try {
    const response = await fetch("public/campaign.json");

    if (!response.ok) {
      throw new Error(`Failed to load campaign: ${response.status}`);
    }

    const data = await response.json();

    // render sections
    renderCampaign(data);
    // init countdown
    startCountdown(data.endsAt, data.ui.countdown);
  } catch (error) {
    console.error("Error loading campaign:", error);
  }
}

loadCampaign();
