# Project document review

## Portfolio update: software and website development

The current site prioritizes four projects: ResQConnect, Relational Library Tracker, the personal portfolio website, and Casal Campus Network. The original document review below is retained as background, not as the current card inventory.

- **ResQConnect:** owner confirms responsibility for the full application backend and map integrations, not database preparation. Technology context was checked in `ResQConnect-main.zip`: Kotlin Android source, Supabase dependencies and data access, osmdroid maps/markers, and external navigation. No build or security audit was performed. The supplied report describes a broader prototype workflow; avoid treating every report claim as independently code-verified.
- **Source access:** the provided team repository returned 404 to public visitors. Keep that limitation visible with its link; the owner's public GitHub profile is `https://github.com/dcruzloryen`.
- **Presentation:** ResQConnect uses application screenshots extracted from `assets/resqconnect visual.pdf`. Its source ZIP and private configuration were not copied into the website.
- **Education:** removed the unconfirmed graduation estimate. A résumé and exact availability still require owner input.

Reviewed six files, representing six distinct projects; five are selected for the portfolio. This is a documentation review, not a source-code audit or independent verification of deployed systems.

## 1. Relational Library Tracker

**Source:** `DelaCruz,Loryen Art - Cana, Raiden, Capellan, Paul, Javier, Kassidy Glean.pdf`

- Strongest featured project: detailed schema, interface samples, and a documented individual lead-developer role.
- Stack described: Java 17+, Swing/AWT, Oracle, JDBC.
- Main functionality: inventory, student registration, borrowing and returns, seven-day due dates, search, transaction views.
- Credit: the CV explicitly identifies Loryen as lead developer; other members remain credited in the case study.
- Caveats: scope says no outside database connection, while implementation sections describe Oracle FreeSQL connectivity. Research descriptions alternate between pre-implementation expectations and completed user results, without supporting evaluation data. Do not claim quantified improvements or production readiness.
- Portfolio image: original inventory interface from page 43.

## 2. TIPid Market

**Source:** `FINAL-PROJECT-MOBILE-COMPUTING.docx`

- Android campus marketplace with proposed official-email access, listings, search, and text chat.
- Loryen's assigned tasks: scope and delimitations, XML.
- Do not claim sole Java implementation: the assignment table credits another team member.
- No payment gateways, delivery, dispute handling, or multimedia chat.
- The supplied text establishes requirements, not a verified deployed implementation. No unverified Firebase, React Native, or backend stack was added.
- Portfolio visual is a labeled concept illustration, not a screenshot.

## 3. TIPid Food Ordering

**Source:** `CompProg2_Project.docx`

- Java Swing ordering project demonstrating OOP, Runnable, file I/O, exceptions, and regex.
- Flat text-file storage is described; SQLite is a future enhancement.
- Results section is unfinished and screenshots are absent.
- Individual responsibilities are not supplied, so the portfolio credits team participation without inventing ownership.
- Cover date November 14, 2025 and the semester/year labeling need confirmation.
- Portfolio visual is a labeled concept illustration.

## 4. Casal Campus Network

**Source:** `Casal_Campus_Network_Paper.docx.pdf`

- Cisco Packet Tracer design with VLANs, departmental addressing, DHCP/DNS, routers, and switches.
- Useful evidence of systems thinking and technical documentation.
- Addressing inconsistency: a /23 base and VLSM explanation conflict with the many /24 allocations.
- Server subnet text conflicts with the listed 172.16.1.x addresses. Router-on-a-stick descriptions do not fully match multilayer-switch/HSRP descriptions.
- Present as an academic network design, not a validated production installation.
- Portfolio image: original topology illustration from page 7.

## 5. Inside the Computer

**Source:** `CAO SPECIAL PROJECT DOCUMENTATION - DELA CRUZ, LORYEN ART.pdf`

- Individual assignment dated March 26, 2026.
- Topics: system organization, decimal 42 conversion, AND/NAND, ASCII, DOS-style assembly parity example.
- Assembly reads one character and checks its least-significant bit, rather than parsing full integers.
- Input validation is absent. “TypeScript” above the assembly example is a document labeling error.

## Additional document: Gym Membership Transaction System

**Source:** `FINAL_PROJECT.pdf`

- This is a separate, earlier C++ group assignment from December 2024, not the computer architecture report. It describes runtime-only plans and transactions, discounts, cash payments, receipts, and daily reports.
- It is not included among the five selected portfolio cards, to prioritize the more recent and relevant work.
- Loryen's documented role: background of the study and project objectives; the report credits program code to Yhian Richie Mercado.
- Code review from the embedded listing: transactions are pushed into the transaction vector before payment success is checked. A failed payment can therefore still appear in the daily report. Discount/payment input validation is also missing.
- No database, file persistence, web interface, or digital payment integration is implemented in the provided listing.

## Portfolio choices

- Name and education inferred from the consistent identity in the documents; owner should confirm before publishing.
- Academic outcomes are described without invented user counts, performance metrics, or production claims.
- No fabricated contact details, GitHub links, testimonials, employment, or live demos.
- Original documents remain untouched and are not exposed as public downloads.
