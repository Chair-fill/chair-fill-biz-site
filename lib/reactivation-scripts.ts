// Five reactivation text templates a barber can send to lapsed clients.
// Voice: casual, one-to-one, no hard sell — the way a barber actually texts.
// [Name] = the client, [Barber] = the barber. Unlocked on the calculator page
// after email capture.
export interface ReactivationScript {
  title: string;
  when: string;
  text: string;
}

export const REACTIVATION_SCRIPTS: ReactivationScript[] = [
  {
    title: "The check-in",
    when: "Client you haven't seen in 30 to 60 days",
    text: "Aye [Name], it's [Barber] 💈 been a minute. Just checking in on you. You due for a lineup soon?",
  },
  {
    title: "The open slot",
    when: "You have a last-minute gap to fill",
    text: "[Name] I had a slot open up [day] at [time]. Wanted to hit you first before I put it out. You want it?",
  },
  {
    title: "The reason to come back",
    when: "Client who went quiet, no pressure",
    text: "No pressure at all [Name], just don't want you walking around not right 😂 whenever you ready, I got you. Same chair.",
  },
  {
    title: "The routine reset",
    when: "Client who used to come regularly",
    text: "[Name] you used to be in every [couple weeks] like clockwork. Let's get you back on schedule. What day works for you this week?",
  },
  {
    title: "The bring-a-friend",
    when: "Reactivate + get a referral in one text",
    text: "[Name] been a minute bro. Come slide through this week and bring somebody who needs a cut too. I'll take care of both of y'all.",
  },
];
