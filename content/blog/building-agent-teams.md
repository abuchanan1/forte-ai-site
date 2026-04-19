# When One Agent Is Not Enough: How to Architect AI Like You Architect a Team

I have built teams from scratch more than once.

Not in the abstract. In the actual sense. A small group of people with no defined roles, a stack of work that needed doing, and a manager (me) trying to figure out who should own what, how they should hand things off, and when to add a third or fourth person.

Building agentic AI systems for organizations turns out to be the same job. Almost exactly.

Most people are not yet thinking about it this way. They are thinking about agents the way they thought about apps. One agent does one thing. Drop it in. Done.

That works for the first agent. It almost always falls apart by the third.

## What I have seen go wrong

Here is what I have watched happen on real builds, including my own early attempts.

You start with one agent. It does a synthesis task. Reads meetings, reads emails, produces a brief. It works well. The leader is delighted.

Then someone says, "Could it also handle the weekly board update?" So you add the board update to the agent's job. It is the same data, after all.

Then someone says, "Could it also flag risks across the portfolio?" You add risk flagging.

Then, "Could it also draft responses to specific stakeholders?"

By the time you have given one agent four jobs, three things start to break.

**The agent loses context.** Each task pulls in different priorities, different audiences, different formats. The agent starts mixing them up. The board update has the texture of a stakeholder reply. The risk flag gets buried in the synthesis brief.

**The agent surfaces bad signal.** When you cram too much into one prompt, the model has to make tradeoffs you cannot see. It starts flagging things that are technically true but operationally noise. The leader stops trusting the output.

**The system does not flag the failure.** This is the worst part. Single agents that get overloaded fail quietly. The output still looks plausible. It is just no longer useful. By the time anyone catches it, the leader has been making decisions on degraded outputs for weeks.

So you split the agent. You think, fine, two agents. One for synthesis, one for the board. But now there is a coordination problem. They both read the same data. They sometimes contradict each other. The leader has to reconcile.

Now you have the team-building problem. Welcome.

## The team analogy is not a metaphor. It is the same problem.

When I built my first team, I made every mistake a first-time manager makes.

I gave one person too many things. I assumed people would coordinate without being told how. I designed roles around tasks instead of around outcomes. I underestimated how much overhead it took to keep two or three people aligned versus one person doing everything.

Eventually I figured out the questions a real manager has to answer:

- What is each person's capacity? What can one person actually hold at once?
- Where do their roles intersect, and how do they hand off?
- What triggers each person to act? Is it a calendar? A request? An event upstream?
- How do they share context? What do they all need to know versus what is one person's job to know?
- Who has the final call when they disagree?
- Who is accountable for the overall outcome, even if no single person owns every piece?

Every one of those questions applies to building agents. Same questions. Same tradeoffs. Same failure modes when you skip them.

## What capacity actually means for an agent

A person has cognitive bandwidth. A meeting that lasts an hour costs them an hour of attention. They can hold a few projects in their head at a time, but only at the cost of doing each one a little worse.

An agent has the same constraint, just expressed differently. The constraint is the context window, the prompt complexity, and the breadth of judgment you are asking the model to make in a single call.

A small, well-scoped agent doing one job, with clear inputs and one output format, performs reliably. The same model, given five jobs in one prompt, starts producing worse versions of all five. Not because the model got dumber. Because you violated the same principle a manager violates when they give one report too many priorities.

The fix is the same fix.

You split the work. You define clearer roles. You build handoffs.

## What good agent architecture looks like

When I design an agent system for a client now, the first hour is not technical. It looks more like an org design conversation than an engineering conversation.

We talk about jobs to be done, not about features. We figure out which jobs are similar enough to belong to one agent and which are different enough to belong to separate ones. We talk about triggers. What wakes each agent up? Is it a meeting that ended? An email that arrived? A scheduled time? A request from a human?

We talk about handoffs. When agent A finishes its work, what does it pass to agent B? In what format? With what context attached? This is exactly the conversation a manager has when defining how a sales rep hands off to an account manager.

We talk about coordination. When two agents touch the same data, who has authority? When they produce conflicting outputs, who reconciles? Usually the answer is "a human," and that human becomes the agent system's manager.

We talk about accountability. Even though each agent owns a piece, someone (or something) needs to own the overall outcome. Otherwise the system can be technically working while practically failing.

These are not edge-case conversations. These are the conversations.

## Some real questions worth answering before you build

When a client asks me to build them an agent or a system of agents, here are some of the questions I bring to the first working session. None of these have universal answers. They are answered organization by organization.

- What is the smallest piece of work that, if done well by an agent, would meaningfully change someone's week?
- What does this agent need to know that is not in any database? Where does that context live?
- What does success look like, in a sentence the agent can be measured against?
- What happens when the agent is unsure? Who does it ask?
- What other agents, if any, will it need to coordinate with? On what cadence?
- What is the human's role in the loop? Reviewing every output? Spot-checking? Approving high-stakes actions only?
- When should this agent get split into two? What is the signal we will watch for?

We work through these together. The architecture is downstream of the answers.

## The reason this matters

The narrative right now is that AI agents are going to do everything. Replace people. Run autonomously. Make decisions while you sleep.

That narrative is wrong, and it is also boring. The actual interesting work is the same work that has always made organizations function: thoughtful design of who does what, how information flows, where authority sits, and what happens when something breaks.

The leaders I work with already know how to think about teams. They have done it for years. The good news is that intuition transfers directly. The bad news is that almost no one is selling agents in a way that respects that intuition.

I think they should be.

When you are evaluating agentic AI for your organization, the questions to ask are not "how autonomous is it" or "what models does it use." The questions to ask are the management questions. What can one agent hold? What is its job? How does it coordinate with the others? Who is accountable for the result?

If the vendor cannot answer those questions clearly, they have not built you a system. They have built you a demo.

A real agent system is a real team. Treat it like one.

---

*Aaron Buchanan, MPP, is the founder of Forte AI Solutions. We design and build AI agent systems for leadership teams at small businesses and nonprofits, with the same care a thoughtful manager brings to building a real team. [Book a discovery call](/contact) to talk through the agent architecture for your organization.*
