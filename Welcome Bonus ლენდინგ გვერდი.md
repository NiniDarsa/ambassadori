# Welcome Bonus ლენდინგ გვერდი

ააწყე რესპონსიული Welcome Bonus ლენდინგ გვერდი

ჩვენი მარკეტინგის გუნდი ახალი მოთამაშეებისთვის *Welcome Bonus* აქციას იწყებს: ფრისპინები რეგისტრაციისთვის, პირველი დეპოზიტისთვის და მისიების შესრულებისთვის.

გვერდი **web component**-ის სახით ჩაშენდება ჩვენს მთავარ საიტში. თუმცა ამ დავალების შესასრულებლად HTML/CSS და Vanila JavaScript გამოიყენე;

- გვერდი კონტენტს JSON ფაილიდან ტვირთავს (production-ში ეს მონაცემები CMS API-დან მოდის).

დიზაინის ზედა ნაწილში არსებული საიტის header და ნავიგაცია დავალებაში **არ** შედის..

## დიზაინი

დართულია ორი სურათი: **desktop (1440 px სიგანე)** და **mobile (390 px სიგანე)**. ააწყე სურათების მიხედვით. Figma ფაილს გარეშე. დაშორებების, ფერებისა და შრიფტების თვალით დამთხვევა დავალების ნაწილია (ან შეგიძლიათ სხვა თულების გამოყენება ამ ინფორმაციების ფოტოდან მისაღებად).

## მოთხოვნები

გვერდზე ყველა ტექსტი და რიცხვი JSON ფაილიდან უნდა მოდიოდეს და არა HTML-ში hard-code-ით.

- **Countdown უნდა აჩვენებდეს** აქციის, ბროუზერის მიდინარე დროიდან (ამ წუთიდან) `endsAt` დრომდე: დღე, საათი, წუთი, წამი, ყოველ წამში განახლებით. დროს ამოწურვისას აჩვენე `00 : 00 : 00 : 00` და ტექსტი "აქცია დასრულდა".
- **Progress bar:** შევსება `progress.current`-ის მიხედვით
- **სლოტების სია:** სლოტების სურათების ჰორიზონტალური რიგი, რომელიც გვერდზე scroll-დება, და **ყველა სლოტის ნახვის** ღილაკი.

## Mock მონაცემები

zip-ში ეს ფაილი უკვე არის როგორც `public/campaign.json`, სურათებთან ერთად. საჭიროების შემთხვევაში შეგიძლია ველები დაამატო. "აქცია დასრულდა" მდგომარეობის შესამოწმებლად `endsAt` წარსულ დროზე დააყენე.

```json
{
  "id": "welcome-bonus",
  "endsAt": "2026-12-31T20:00:00Z",
  "background": {
    "imageDesktop": "/images/full_desktop.png",
    "imageMobile": "/images/full_mobile.png"
  },
  "hero": {
    "hero": "/images/hero.png",
    "title": "დაიწყე თამაში 100 ფრისპინით!",
    "subtitle": "დარეგისტრირდი და მიიღე საჩუქარი ექსკლუზიურ სლოტში AMBASSADOR VAMPIRE NIGHT!"
  },
  "summary": [
    { "value": "100 FS", "label": "რეგისტრაციისთვის", "highlighted": false },
    { "value": "100 FS", "label": "პირველ დეპოზიტზე", "highlighted": false },
    { "value": "300 FS", "label": "მისიების შესრულებით", "highlighted": false },
    { "value": "500 FS", "label": "ჯამური საჩუქარი", "highlighted": true }
  ],
  "register": {
    "title": "დარეგისტრირდი და მიიღე საჩუქარი",
    "text": "დარეგისტრირდი AMBASSADORIBET-ზე და მიიღე 100 ფრისპინი საჩუქრად!",
    "image": "/images/vampire-night.png",
    "freespins": 100,
    "game": "Ambassadori Vampire Night",
    "button": "დარეგისტრირდი"
  },
  "deposit": {
    "title": "შეიტანე დეპოზიტი და მიიღე მეტი!",
    "text": "გააკეთე დეპოზიტი რეგისტრაციიდან 24 საათში და მიიღე 100-მდე დამატებითი ფრისპინი!",
    "freespins": 100,
    "game": "Ambassadori Vampire Night",
    "button": "დეპოზიტი",
    "tiers": [
      { "from": 10, "to": 24.99, "freespins": 10 },
      { "from": 25, "to": 49.99, "freespins": 25 },
      { "from": 50, "to": 99.99, "freespins": 50 },
      { "from": 100, "to": null, "freespins": 100 }
    ]
  },
  "missions": {
    "title": "შეასრულე პროგრესი და მიიღე დამატებითი პრიზები",
    "progress": { "current": 250, "currency": "₾" },
    "milestones": [
      { "amount": 500, "reward": 100, "rewardIcon": "/images/reward-icon.png" },
      { "amount": 1000, "reward": 200, "rewardIcon": "/images/reward-icon.png" }
    ],
    "slots": [
      { "id": "gates-of-olympus", "name": "Gates of Olympus", "image": "/images/slots/olympus.png" },
      { "id": "40-shining-crown", "name": "40 Shining Crown", "image": "/images/slots/shining-crown.png" },
      { "id": "buffalo-king", "name": "Buffalo King Megaways", "image": "/images/slots/buffalo-king.png" },
      { "id": "10-dazzling-hot", "name": "10 Dazzling Hot", "image": "/images/slots/dazzling-hot.png" }
    ],
    "button": "ყველა სლოტის ნახვა"
  },
  "rules": [
    { "title": "დაწყება/დამთავრება", "body": "აქცია მოქმედებს 1 დეკემბრიდან 31 დეკემბრამდე." },
    { "title": "აქციის პირობები", "body": "ფრისპინები ირიცხება ახალ მოთამაშეებზე." },
    { "title": "წესები და პირობები", "body": "სრული წესები იხილეთ საიტზე." }
  ]
}
```