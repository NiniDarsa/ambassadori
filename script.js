async function loadCampaign() {
  const response = await fetch("./welcome-bonus-assets/public/campaign.json");
  const data = await response.json();

  document.documentElement.style.setProperty(
    "--bg-desktop",
    `url("./welcome-bonus-assets/public${data.background.imageDesktop}")`,
  );

  document.documentElement.style.setProperty(
    "--bg-mobile",
    `url("./welcome-bonus-assets/public${data.background.imageMobile}")`,
  );

  renderCampaign(data);
  startCountdown(data.endsAt);
}

loadCampaign();

//Reusable functions
function getImagePath(path) {
  return `./welcome-bonus-assets/public${path}`;
}

function highlightLastWords(text, count = 2) {
  const words = text.split(" ");
  const highlighted = words.splice(-count, count);

  return `${words.join(" ")} <span class="pinkText">${highlighted.join(" ")}</span>`;
}

//Whole page(combine whole Part)
function renderCampaign(data) {
  const container = document.querySelector("#campaign");

  container.innerHTML = `
    <div class="container">
            ${renderHero(data.hero)}
            ${renderSummary(data.summary)}
            ${renderRegister(data.register)}
            ${renderDeposit(data.deposit)}
            ${renderMissions(data.missions, data.endsAt)}
            ${renderRules(data.rules)}
        </div>
    `;
}

//Hero Part
function renderHero(hero) {
  return `
        <section class="hero">
            <img src="${getImagePath(hero.image)}" alt="Hero image">
            <div class="heroTextContainer">
            <h1>${highlightLastWords(hero.title)}</h1>
            <p>${hero.subtitle}</p>
            </div>
        </section>
    `;
}

//Summary
function renderSummary(summary) {
  return `
        <section class="summary">
            ${summary
              .map(
                (item) => `
                <div class="summary-card ${item.highlighted ? "highlighted" : ""}">
                    <h2 class="gradient-text">${item.value}</h2>
                    <p>${item.label}</p>
                </div>
            `,
              )
              .join("")}
        </section>
    `;
}

//Registration
function renderRegister(register) {
  return `
    <section class="register">
      <h2>1. ${register.title}</h2>

      <div class="register-container">
        <div class="register-image">
          <img src="${getImagePath(register.image)}" alt="${register.game}">
        </div>

        <div class="register-content">
       
        <p class="register-description">
                 ${register.text.replace("AMBASSADORIBET-ზე", "<br>AMBASSADORIBET-ზე")}
        </p>

          <div class="register-reward">
            <span class="reward-amount gradient-text">${register.freespins}</span>

            <div class="reward-details">
              <span class="reward-type">freespin</span>
              <span class="reward-game">${register.game}</span>
            </div>
          </div>

          <button class="register-button">${register.button}</button>
        </div>
      </div>
    </section>
  `;
}

//Deposit
function renderDeposit(deposit) {
  return `
    <section class="deposit">
      <h2>2. ${deposit.title}</h2>

      <div class="deposit-container">
        <p class="deposit-description">${deposit.text}</p>

        <div class="deposit-content">
          <div class="deposit-reward">
            <span class="deposit-amount gradient-text">${deposit.freespins}</span>

            <div class="deposit-details">
              <span class="deposit-type">freespin</span>
              <span class="deposit-game">${deposit.game}</span>
            </div>
          </div>

          <button class="deposit-button">${deposit.button}
          <svg width="20" height="20" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" fill="white" />
          <path  d="M20 12V28 M12 20H28"  stroke="#07912B" stroke-width="5" stroke-linecap="round" />
          </svg>
          </button>
        </div>

        <div class="tiers">
          <div class="tier-row tier-header">
            <span>დეპოზიტი</span>
            <span>შენი საჩუქარი</span>
          </div>

         ${deposit.tiers
           .map(
             (tier, index) => `
             <div class="tier-row">
              <span>${tier.to ? `${tier.from} - ${tier.to} ₾` : `${tier.from} და მეტი`}</span>

              <span>
                <span class="${index === deposit.tiers.length - 1 ? "gradient-text" : ""}">
                 ${tier.freespins} FS
                </span>
              </span>
          </div> `,
           )
           .join("")}
        </div>
      </div>
    </section>
  `;
}

//Missions

function startCountdown(endsAt) {
  const countdown = document.querySelector(".countdown");
  const numbers = countdown.querySelector(".countdown-numbers");
  const status = countdown.querySelector(".countdown-status");

  const interval = setInterval(() => {
    const difference = new Date(endsAt).getTime() - Date.now();

    if (difference <= 0) {
      numbers.textContent = "00 : 00 : 00 : 00";
      status.textContent = "აქცია დასრულდა";

      clearInterval(interval);
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    numbers.innerHTML = `
  <div class="countdown-item">
    <div>${String(days).padStart(2, "0")}<span>დღე</span></div>
  </div>
  <span class="countdown-separator">:</span>

  <div class="countdown-item">
    <div>${String(hours).padStart(2, "0")}<span>საათი</span></div>
  </div>
  <span class="countdown-separator">:</span>

  <div class="countdown-item">
    <div>${String(minutes).padStart(2, "0")}<span>წუთი</span></div>
  </div>
  <span class="countdown-separator">:</span>

  <div class="countdown-item">
    <div>${String(seconds).padStart(2, "0")}<span>წამი</span></div>
  </div>
`;

    status.textContent = "";
  }, 1000);
}

function renderMissions(missions, endsAt) {
  const maxAmount = Math.max(...missions.milestones.map((m) => m.amount), 1100);
  const currentProgress = missions.progress.current;
  const progressPercent = (currentProgress / maxAmount) * 100;

  return `
        <section class="missions">
            <h2>3. ${missions.title}</h2>

            <div class="missions-container">
             <div class="missions-description">${highlightLastWords(missions.text)}</div>
              
             <div class="missions-countdown">
                <span class="countdown-title">აქციის დასრულებამდე</span>
                <div class="countdown">
                  <div class="countdown-numbers"></div>   
                </div>
                <p class="countdown-status"></p>    
             </div>

             <div class="mission-progress-wrapper">
                <div class="progress-row-top">
                    <span class="progress-label-title">პროგრესი</span>
                    <div class="milestones-top-scale">
                        ${missions.milestones
                          .map((item) => {
                            const posPercent = (item.amount / maxAmount) * 100;
                            return `<div class="scale-marker" style="left: ${posPercent}%">
                                    <span class="marker-amount">${item.amount}${missions.progress.currency}</span>
                                  </div>`;
                          })
                          .join("")}
                    </div>
                </div>

                <div class="custom-progress-bar">
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="progress-thumb" style="left: ${progressPercent}%">
                        <span>+${currentProgress}${missions.progress.currency}</span>
                    </div>
                </div>

                <div class="progress-row-bottom">
                    <span class="progress-label-title">საჩუქარი</span>
                    <div class="milestones-bottom-rewards">
                        ${missions.milestones
                          .map((item) => {
                            const posPercent = (item.amount / maxAmount) * 100;
                            return `<div class="reward-marker" style="left: ${posPercent}%">
                                    <span class="reward-value gradient-text">${item.reward} <img src="${getImagePath(item.rewardIcon)}" alt="Reward"></span>
                                  </div>`;
                          })
                          .join("")}
                    </div>
                </div>
             </div>



            <div class="slots">
               ${missions.slots
                 .map(
                   (slot) => `
                  <div class="slot-card">
                      <img src="${getImagePath(slot.image)}" alt="${slot.name}">
                      <span class="slot-title">${slot.name}</span>
                  </div>
                 `,
                 )
                 .join("")}
            </div>

            <button class="missions-button" 
            onclick="const container = this.parentElement;
                     container.classList.toggle('active');
                     this.textContent = container.classList.contains('active') ? 'დახურვა' : '${missions.button}';">
          ${missions.button}
          </button>

            </div>
        </section>
    `;
}

//Rules
function renderRules(rules) {
  return `
    <section class="rules">
      <h2 class="rules-heading">წესები და პირობები</h2>
      <div class="rules-list">
        ${rules
          .map(
            (rule) => `
            <div class="rule-item">
              <div class="rule-header" onclick="this.parentElement.classList.toggle('active')">
                <h3>${rule.title}</h3>
                <svg class="rule-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="rule-body">
                <div class="rule-body-inner">
                  <p>${rule.body}</p>
                </div>
              </div>
            </div>
          `,
          )
          .join("")}
      </div>
    </section>
  `;
}
