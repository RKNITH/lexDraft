export const documentCategories = [
  { id: 'business', label: 'Business', icon: '🏢', color: 'gold' },
  { id: 'employment', label: 'Employment', icon: '👔', color: 'sage' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠', color: 'crimson' },
  { id: 'personal', label: 'Personal', icon: '👤', color: 'gold' },
  { id: 'ip', label: 'Intellectual Property', icon: '💡', color: 'sage' },
];

export const documentTemplates = [
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    shortTitle: 'NDA',
    category: 'business',
    description: 'Protect confidential information shared between parties with a legally binding NDA.',
    estimatedTime: '3 min',
    popular: true,
    fields: [
      { id: 'disclosingParty', label: 'Disclosing Party Name', type: 'text', placeholder: 'e.g. Acme Corporation', required: true },
      { id: 'disclosingPartyAddress', label: 'Disclosing Party Address', type: 'textarea', placeholder: 'Full legal address', required: true },
      { id: 'receivingParty', label: 'Receiving Party Name', type: 'text', placeholder: 'e.g. John Doe / XYZ Ltd.', required: true },
      { id: 'receivingPartyAddress', label: 'Receiving Party Address', type: 'textarea', placeholder: 'Full legal address', required: true },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', placeholder: 'e.g. Evaluation of a potential business partnership', required: true },
      { id: 'confidentialInfo', label: 'Definition of Confidential Information', type: 'textarea', placeholder: 'e.g. Trade secrets, business plans, financial data...', required: true },
      { id: 'duration', label: 'Agreement Duration (years)', type: 'number', placeholder: '2', required: true },
      { id: 'governingLaw', label: 'Governing Law (State/Country)', type: 'text', placeholder: 'e.g. State of Delaware, USA', required: true },
    ],
    generate: (data) => `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of ${data.effectiveDate || '___________'}, by and between:

DISCLOSING PARTY:
${data.disclosingParty || '___________'}
${data.disclosingPartyAddress || '___________'}

RECEIVING PARTY:
${data.receivingParty || '___________'}
${data.receivingPartyAddress || '___________'}

1. PURPOSE
The parties wish to explore ${data.purpose || '___________'} (the "Purpose"). In connection with the Purpose, the Disclosing Party may disclose certain confidential and proprietary information to the Receiving Party.

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any and all information or data that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. This includes but is not limited to: ${data.confidentialInfo || '___________'}.

3. OBLIGATIONS
The Receiving Party agrees to:
   a) Keep all Confidential Information strictly confidential;
   b) Not disclose Confidential Information to any third party without prior written consent;
   c) Use Confidential Information solely for the Purpose stated above;
   d) Protect the Confidential Information with at least the same degree of care used to protect its own confidential information.

4. EXCLUSIONS
The obligations under this Agreement shall not apply to information that:
   a) Is or becomes publicly known through no breach of this Agreement;
   b) Was rightfully known before receipt from the Disclosing Party;
   c) Is independently developed without use of Confidential Information;
   d) Must be disclosed by law or court order.

5. TERM
This Agreement shall remain in effect for a period of ${data.duration || '___'} year(s) from the Effective Date, unless earlier terminated by mutual written consent.

6. RETURN OF INFORMATION
Upon request, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.

7. REMEDIES
The parties acknowledge that a breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate. The Disclosing Party shall be entitled to seek injunctive relief in addition to other remedies.

8. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of ${data.governingLaw || '___________'}, without regard to its conflict of law principles.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY:
Signature: _______________________
Name: ${data.disclosingParty || '___________'}
Date: _______________________

RECEIVING PARTY:
Signature: _______________________
Name: ${data.receivingParty || '___________'}
Date: _______________________`
  },
  {
    id: 'employment-contract',
    title: 'Employment Contract',
    shortTitle: 'Employment',
    category: 'employment',
    description: 'Comprehensive employment agreement defining roles, compensation, and obligations.',
    estimatedTime: '5 min',
    popular: true,
    fields: [
      { id: 'employerName', label: 'Employer / Company Name', type: 'text', placeholder: 'e.g. Acme Inc.', required: true },
      { id: 'employerAddress', label: 'Employer Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'employeeName', label: 'Employee Full Name', type: 'text', placeholder: 'e.g. Jane Smith', required: true },
      { id: 'employeeAddress', label: 'Employee Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'jobTitle', label: 'Job Title / Position', type: 'text', placeholder: 'e.g. Senior Software Engineer', required: true },
      { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Engineering', required: false },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'employmentType', label: 'Employment Type', type: 'select', options: ['Full-Time', 'Part-Time', 'Contract', 'Temporary'], required: true },
      { id: 'salary', label: 'Annual Salary / Compensation', type: 'text', placeholder: 'e.g. $85,000 per annum', required: true },
      { id: 'workHours', label: 'Working Hours per Week', type: 'number', placeholder: '40', required: true },
      { id: 'benefits', label: 'Benefits & Perks', type: 'textarea', placeholder: 'e.g. Health insurance, 401(k), paid vacation...', required: false },
      { id: 'probationPeriod', label: 'Probation Period (months)', type: 'number', placeholder: '3', required: false },
      { id: 'noticePeriod', label: 'Notice Period', type: 'text', placeholder: 'e.g. 30 days', required: true },
      { id: 'governingLaw', label: 'Governing Law', type: 'text', placeholder: 'e.g. State of California, USA', required: true },
    ],
    generate: (data) => `EMPLOYMENT CONTRACT

This Employment Contract ("Agreement") is entered into as of ${data.startDate || '___________'}, between:

EMPLOYER:
${data.employerName || '___________'}
${data.employerAddress || '___________'}

EMPLOYEE:
${data.employeeName || '___________'}
${data.employeeAddress || '___________'}

1. POSITION AND DUTIES
The Employer hereby employs the Employee as ${data.jobTitle || '___________'}${data.department ? ` in the ${data.department} department` : ''}. The Employee agrees to perform all duties and responsibilities associated with this position and such other duties as may be assigned from time to time.

2. COMMENCEMENT AND TYPE
Employment shall commence on ${data.startDate || '___________'} and shall be ${data.employmentType || '___________'} employment.${data.probationPeriod ? ` The Employee shall be subject to a probationary period of ${data.probationPeriod} month(s).` : ''}

3. COMPENSATION
The Employee shall receive a compensation of ${data.salary || '___________'}, payable in accordance with the Employer's standard payroll schedule, subject to applicable deductions and withholdings.

4. WORKING HOURS
The Employee shall work ${data.workHours || '___'} hours per week. The specific schedule shall be determined by the Employer. Overtime compensation shall be governed by applicable law.

5. BENEFITS
${data.benefits ? `The Employee shall be entitled to the following benefits:\n${data.benefits}` : 'Benefits shall be provided per the Employer\'s standard employee benefits policy.'}

6. CONFIDENTIALITY
The Employee agrees to keep all trade secrets, proprietary information, and business data of the Employer strictly confidential, both during and after the term of employment.

7. INTELLECTUAL PROPERTY
All work product, inventions, and developments created by the Employee in the scope of employment shall be the sole property of the Employer.

8. NON-COMPETE
During employment and for a period of one (1) year thereafter, the Employee shall not engage in any business activity that directly competes with the Employer's business without prior written consent.

9. TERMINATION
Either party may terminate this Agreement upon providing ${data.noticePeriod || '___'} written notice to the other party. The Employer may terminate immediately for cause, including but not limited to misconduct, dishonesty, or material breach of this Agreement.

10. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.governingLaw || '___________'}.

11. ENTIRE AGREEMENT
This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements.

IN WITNESS WHEREOF, the parties have executed this Employment Contract:

EMPLOYER:
Signature: _______________________
Name: _______________________________
Title: _______________________________
Date: _______________________

EMPLOYEE:
Signature: _______________________
Name: ${data.employeeName || '___________'}
Date: _______________________`
  },
  {
    id: 'lease-agreement',
    title: 'Lease Agreement',
    shortTitle: 'Lease',
    category: 'real-estate',
    description: 'Residential or commercial lease agreement between landlord and tenant.',
    estimatedTime: '5 min',
    popular: true,
    fields: [
      { id: 'landlordName', label: 'Landlord Name', type: 'text', placeholder: 'e.g. Robert Johnson', required: true },
      { id: 'landlordAddress', label: 'Landlord Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'tenantName', label: 'Tenant Name(s)', type: 'text', placeholder: 'e.g. Alice Brown', required: true },
      { id: 'propertyAddress', label: 'Property Address', type: 'textarea', placeholder: 'Full rental property address', required: true },
      { id: 'propertyType', label: 'Property Type', type: 'select', options: ['Residential Apartment', 'House', 'Commercial Space', 'Studio', 'Condo'], required: true },
      { id: 'leaseStartDate', label: 'Lease Start Date', type: 'date', required: true },
      { id: 'leaseEndDate', label: 'Lease End Date', type: 'date', required: true },
      { id: 'monthlyRent', label: 'Monthly Rent Amount', type: 'text', placeholder: 'e.g. $2,500', required: true },
      { id: 'securityDeposit', label: 'Security Deposit Amount', type: 'text', placeholder: 'e.g. $5,000', required: true },
      { id: 'paymentDueDay', label: 'Rent Due Day of Month', type: 'number', placeholder: '1', required: true },
      { id: 'utilities', label: 'Utilities Included', type: 'textarea', placeholder: 'e.g. Water, trash (Tenant pays electricity, gas)', required: false },
      { id: 'petPolicy', label: 'Pet Policy', type: 'select', options: ['No Pets Allowed', 'Pets Allowed with Deposit', 'Cats Only', 'Small Dogs Only', 'All Pets Welcome'], required: true },
      { id: 'governingLaw', label: 'Governing Law (State)', type: 'text', placeholder: 'e.g. State of New York', required: true },
    ],
    generate: (data) => `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Agreement") is entered into as of ${data.leaseStartDate || '___________'}, between:

LANDLORD:
${data.landlordName || '___________'}
${data.landlordAddress || '___________'}

TENANT(S):
${data.tenantName || '___________'}

1. PREMISES
Landlord hereby leases to Tenant the ${data.propertyType || 'property'} located at:
${data.propertyAddress || '___________'}
("the Premises")

2. TERM
The lease term shall begin on ${data.leaseStartDate || '___________'} and end on ${data.leaseEndDate || '___________'}. This Agreement shall automatically become a month-to-month tenancy upon expiration unless renewed in writing.

3. RENT
Tenant agrees to pay monthly rent of ${data.monthlyRent || '___________'}, due on the ${data.paymentDueDay || '1st'} day of each month. A late fee of 5% shall be assessed for payments received after 5 days from the due date.

4. SECURITY DEPOSIT
Tenant shall deposit ${data.securityDeposit || '___________'} as a security deposit prior to occupancy. This deposit will be held as security for faithful performance of the terms of this Agreement and returned within 30 days of tenancy end, less any deductions for damages.

5. UTILITIES AND SERVICES
${data.utilities ? data.utilities : 'Tenant shall be responsible for all utility payments unless otherwise agreed in writing.'}

6. PET POLICY
${data.petPolicy || 'No Pets Allowed'}. Violations of this policy may result in lease termination.

7. USE OF PREMISES
The Premises shall be used solely as a private residence. Tenant shall not engage in any business activities on the Premises without prior written consent.

8. MAINTENANCE AND REPAIRS
Tenant shall maintain the Premises in a clean and sanitary condition. Tenant shall promptly notify Landlord of any necessary repairs. Tenant is responsible for damages caused by negligence or misuse.

9. ALTERATIONS
Tenant shall not make any alterations to the Premises without prior written consent of the Landlord.

10. ENTRY BY LANDLORD
Landlord may enter the Premises with at least 24 hours' notice for inspection, repairs, or showing the property to prospective tenants/buyers.

11. ASSIGNMENT AND SUBLETTING
Tenant shall not assign this Agreement or sublet the Premises without prior written consent of the Landlord.

12. TERMINATION
Either party may terminate this Agreement with 30 days' written notice. Landlord may terminate immediately for non-payment of rent or material breach.

13. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.governingLaw || '___________'}.

IN WITNESS WHEREOF, the parties have executed this Lease Agreement:

LANDLORD:
Signature: _______________________
Name: ${data.landlordName || '___________'}
Date: _______________________

TENANT:
Signature: _______________________
Name: ${data.tenantName || '___________'}
Date: _______________________`
  },
  {
    id: 'freelance-contract',
    title: 'Freelance / Service Agreement',
    shortTitle: 'Freelance',
    category: 'business',
    description: 'Professional service contract between a freelancer and client.',
    estimatedTime: '4 min',
    popular: false,
    fields: [
      { id: 'freelancerName', label: 'Freelancer / Service Provider Name', type: 'text', placeholder: 'e.g. Jane Creative', required: true },
      { id: 'freelancerAddress', label: 'Freelancer Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'clientName', label: 'Client Name / Company', type: 'text', placeholder: 'e.g. StartupXYZ Inc.', required: true },
      { id: 'clientAddress', label: 'Client Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'e.g. Website Redesign Project', required: true },
      { id: 'projectDescription', label: 'Scope of Work / Services', type: 'textarea', placeholder: 'Detailed description of services to be provided', required: true },
      { id: 'startDate', label: 'Project Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'Project End Date / Deadline', type: 'date', required: true },
      { id: 'totalFee', label: 'Total Project Fee', type: 'text', placeholder: 'e.g. $5,000', required: true },
      { id: 'paymentSchedule', label: 'Payment Schedule', type: 'textarea', placeholder: 'e.g. 50% upfront, 50% upon completion', required: true },
      { id: 'revisions', label: 'Number of Revisions Included', type: 'number', placeholder: '3', required: false },
      { id: 'governingLaw', label: 'Governing Law', type: 'text', placeholder: 'e.g. State of Texas, USA', required: true },
    ],
    generate: (data) => `FREELANCE SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of ${data.startDate || '___________'}, between:

SERVICE PROVIDER (FREELANCER):
${data.freelancerName || '___________'}
${data.freelancerAddress || '___________'}

CLIENT:
${data.clientName || '___________'}
${data.clientAddress || '___________'}

1. SERVICES
The Freelancer agrees to provide the following services for the project titled "${data.projectTitle || '___________'}":

${data.projectDescription || '___________'}

2. TIMELINE
Services shall commence on ${data.startDate || '___________'} and shall be completed by ${data.endDate || '___________'}, subject to timely provision of materials and approvals by the Client.

3. COMPENSATION
Client agrees to pay Freelancer a total fee of ${data.totalFee || '___________'} according to the following payment schedule:

${data.paymentSchedule || '___________'}

Payment shall be made within 14 days of invoice. Late payments accrue interest at 1.5% per month.

4. REVISIONS
${data.revisions ? `This Agreement includes ${data.revisions} round(s) of revisions. Additional revisions will be billed at an hourly rate agreed upon in writing.` : 'Revisions shall be negotiated separately.'}

5. INTELLECTUAL PROPERTY
Upon receipt of full payment, all work product created under this Agreement shall become the exclusive property of the Client. Until full payment is received, all intellectual property rights remain with the Freelancer.

6. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of any proprietary information disclosed during the course of this project.

7. INDEPENDENT CONTRACTOR
The Freelancer is an independent contractor and not an employee of the Client. The Freelancer is responsible for all taxes related to compensation received.

8. TERMINATION
Either party may terminate this Agreement with 14 days' written notice. In case of early termination by Client, all work completed to date shall be compensated at the agreed rate.

9. LIMITATION OF LIABILITY
The Freelancer's total liability shall not exceed the total fees paid under this Agreement. Neither party shall be liable for indirect, consequential, or incidental damages.

10. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.governingLaw || '___________'}.

IN WITNESS WHEREOF, the parties have agreed to this Service Agreement:

FREELANCER:
Signature: _______________________
Name: ${data.freelancerName || '___________'}
Date: _______________________

CLIENT:
Signature: _______________________
Name: ${data.clientName || '___________'}
Date: _______________________`
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    shortTitle: 'POA',
    category: 'personal',
    description: 'Authorize another person to act on your behalf in legal or financial matters.',
    estimatedTime: '3 min',
    popular: false,
    fields: [
      { id: 'principalName', label: 'Principal Name (Granting Authority)', type: 'text', placeholder: 'e.g. Michael Carter', required: true },
      { id: 'principalAddress', label: 'Principal Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'agentName', label: 'Agent Name (Receiving Authority)', type: 'text', placeholder: 'e.g. Sarah Carter', required: true },
      { id: 'agentAddress', label: 'Agent Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'poaType', label: 'Type of Power of Attorney', type: 'select', options: ['General', 'Limited / Special', 'Durable', 'Healthcare', 'Financial'], required: true },
      { id: 'powers', label: 'Specific Powers Granted', type: 'textarea', placeholder: 'e.g. Manage bank accounts, sign contracts, sell real property...', required: true },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'expirationDate', label: 'Expiration Date (leave blank if indefinite)', type: 'date', required: false },
      { id: 'governingLaw', label: 'Governing Law (State)', type: 'text', placeholder: 'e.g. State of Florida', required: true },
    ],
    generate: (data) => `POWER OF ATTORNEY

This Power of Attorney ("POA") is granted as of ${data.effectiveDate || '___________'}.

PRINCIPAL (GRANTOR):
${data.principalName || '___________'}
${data.principalAddress || '___________'}

AGENT (ATTORNEY-IN-FACT):
${data.agentName || '___________'}
${data.agentAddress || '___________'}

1. DESIGNATION
I, ${data.principalName || '___________'}, hereby appoint ${data.agentName || '___________'} as my true and lawful attorney-in-fact to act on my behalf.

2. TYPE
This is a ${data.poaType || '___________'} Power of Attorney.

3. POWERS GRANTED
My Agent is authorized to:
${data.powers || '___________'}

4. EFFECTIVE DATE AND DURATION
This Power of Attorney shall be effective on ${data.effectiveDate || '___________'}${data.expirationDate ? ` and shall expire on ${data.expirationDate}` : ' and shall remain in effect until revoked in writing'}.

5. DURABILITY
${data.poaType === 'Durable' ? 'This Power of Attorney is DURABLE and shall remain effective even if the Principal becomes incapacitated or mentally incompetent.' : 'This Power of Attorney shall terminate upon the incapacity of the Principal, unless otherwise specified.'}

6. REVOCATION
This Power of Attorney may be revoked by the Principal at any time by executing a written revocation and notifying the Agent.

7. INDEMNIFICATION
The Principal agrees to hold harmless and indemnify the Agent from all liability for acts performed in good faith pursuant to this Power of Attorney.

8. ACCEPTANCE
By signing below, the Agent accepts the responsibilities and duties granted under this Power of Attorney.

9. GOVERNING LAW
This document shall be governed by the laws of ${data.governingLaw || '___________'}.

PRINCIPAL SIGNATURE:
Signature: _______________________
Name: ${data.principalName || '___________'}
Date: _______________________

AGENT SIGNATURE:
Signature: _______________________
Name: ${data.agentName || '___________'}
Date: _______________________

NOTARY ACKNOWLEDGMENT:
State of _______________________
County of _______________________

On this _______ day of _____________, 20___, before me personally appeared ${data.principalName || '___________'}, known to me to be the person whose name is subscribed to the foregoing instrument.

Notary Public: _______________________
My Commission Expires: _______________________`
  },
  {
    id: 'copyright-assignment',
    title: 'Copyright Assignment Agreement',
    shortTitle: 'Copyright',
    category: 'ip',
    description: 'Transfer ownership of creative works and intellectual property rights.',
    estimatedTime: '3 min',
    popular: false,
    fields: [
      { id: 'assignorName', label: 'Assignor Name (Current Owner)', type: 'text', placeholder: 'e.g. Creative Studios LLC', required: true },
      { id: 'assignorAddress', label: 'Assignor Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'assigneeName', label: 'Assignee Name (New Owner)', type: 'text', placeholder: 'e.g. Digital Corp Inc.', required: true },
      { id: 'assigneeAddress', label: 'Assignee Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'workDescription', label: 'Description of Work / Creation', type: 'textarea', placeholder: 'e.g. Original software application called "AppName", website design, logo...', required: true },
      { id: 'consideration', label: 'Consideration / Payment', type: 'text', placeholder: 'e.g. $10,000 USD', required: true },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'governingLaw', label: 'Governing Law', type: 'text', placeholder: 'e.g. State of California', required: true },
    ],
    generate: (data) => `COPYRIGHT ASSIGNMENT AGREEMENT

This Copyright Assignment Agreement ("Agreement") is entered into as of ${data.effectiveDate || '___________'}, between:

ASSIGNOR (Current Copyright Owner):
${data.assignorName || '___________'}
${data.assignorAddress || '___________'}

ASSIGNEE (New Copyright Owner):
${data.assigneeName || '___________'}
${data.assigneeAddress || '___________'}

1. WORK DESCRIPTION
The Assignor hereby assigns all copyright and related rights in and to the following work(s):
${data.workDescription || '___________'}
("the Work")

2. ASSIGNMENT
For and in consideration of ${data.consideration || '___________'} and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Assignor hereby irrevocably assigns to the Assignee all rights, title, and interest in and to the copyright of the Work, including:
   a) The exclusive right to reproduce the Work;
   b) The right to prepare derivative works;
   c) The right to distribute copies;
   d) The right to perform and display the Work publicly;
   e) All other rights provided by copyright law.

3. MORAL RIGHTS
To the extent permitted by law, the Assignor waives all moral rights in the Work.

4. WARRANTIES
The Assignor represents and warrants that:
   a) They are the sole and exclusive owner of the Work;
   b) The Work does not infringe any third-party intellectual property rights;
   c) They have full authority to enter into this Agreement.

5. INDEMNIFICATION
The Assignor agrees to indemnify and hold harmless the Assignee from any claims arising from a breach of the warranties above.

6. FURTHER ASSURANCES
The Assignor agrees to execute any additional documents necessary to perfect the Assignee's ownership rights.

7. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.governingLaw || '___________'}.

IN WITNESS WHEREOF, the parties have executed this Agreement:

ASSIGNOR:
Signature: _______________________
Name: ${data.assignorName || '___________'}
Date: _______________________

ASSIGNEE:
Signature: _______________________
Name: ${data.assigneeName || '___________'}
Date: _______________________`
  },
  {
    id: 'partnership-agreement',
    title: 'Business Partnership Agreement',
    shortTitle: 'Partnership',
    category: 'business',
    description: 'Formal agreement defining terms, responsibilities, and profit-sharing between business partners.',
    estimatedTime: '5 min',
    popular: true,
    fields: [
      { id: 'businessName', label: 'Partnership / Business Name', type: 'text', placeholder: 'e.g. Smith & Jones Partners', required: true },
      { id: 'partner1Name', label: 'Partner 1 Full Name', type: 'text', placeholder: 'e.g. Alice Smith', required: true },
      { id: 'partner1Address', label: 'Partner 1 Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'partner1Share', label: 'Partner 1 Ownership Share (%)', type: 'number', placeholder: '50', required: true },
      { id: 'partner2Name', label: 'Partner 2 Full Name', type: 'text', placeholder: 'e.g. Bob Jones', required: true },
      { id: 'partner2Address', label: 'Partner 2 Address', type: 'textarea', placeholder: 'Full address', required: true },
      { id: 'partner2Share', label: 'Partner 2 Ownership Share (%)', type: 'number', placeholder: '50', required: true },
      { id: 'businessPurpose', label: 'Business Purpose', type: 'textarea', placeholder: 'e.g. Software development consulting services', required: true },
      { id: 'startDate', label: 'Partnership Start Date', type: 'date', required: true },
      { id: 'initialCapital', label: 'Total Initial Capital Contribution', type: 'text', placeholder: 'e.g. $100,000', required: true },
      { id: 'profitDistribution', label: 'Profit Distribution Method', type: 'select', options: ['Pro-rata based on ownership', 'Equal distribution', 'Performance-based', 'Custom (described below)'], required: true },
      { id: 'governingLaw', label: 'Governing Law (State)', type: 'text', placeholder: 'e.g. State of New York', required: true },
    ],
    generate: (data) => `BUSINESS PARTNERSHIP AGREEMENT

This Partnership Agreement ("Agreement") is entered into as of ${data.startDate || '___________'}, between the following partners:

PARTNER 1:
${data.partner1Name || '___________'}
${data.partner1Address || '___________'}
Ownership Interest: ${data.partner1Share || '___'}%

PARTNER 2:
${data.partner2Name || '___________'}
${data.partner2Address || '___________'}
Ownership Interest: ${data.partner2Share || '___'}%

1. PARTNERSHIP NAME AND PURPOSE
The partners hereby form a general partnership under the name "${data.businessName || '___________'}" for the purpose of:
${data.businessPurpose || '___________'}

2. TERM
This partnership shall commence on ${data.startDate || '___________'} and shall continue until dissolved in accordance with this Agreement.

3. CAPITAL CONTRIBUTIONS
The total initial capital of ${data.initialCapital || '___________'} shall be contributed as follows:
- ${data.partner1Name || 'Partner 1'}: ${data.partner1Share || '___'}% of total capital
- ${data.partner2Name || 'Partner 2'}: ${data.partner2Share || '___'}% of total capital

4. PROFIT AND LOSS ALLOCATION
${data.profitDistribution === 'Pro-rata based on ownership' 
  ? `Profits and losses shall be allocated in proportion to each partner's ownership interest:\n- ${data.partner1Name || 'Partner 1'}: ${data.partner1Share || '___'}%\n- ${data.partner2Name || 'Partner 2'}: ${data.partner2Share || '___'}%`
  : `Profits and losses shall be distributed via: ${data.profitDistribution || '___________'}`
}

5. MANAGEMENT AND VOTING
Each partner shall have equal voting rights on major business decisions. Day-to-day operations may be managed by mutual delegation. Major decisions (>$10,000 expenditure, new contracts, hiring) require unanimous partner approval.

6. BANKING AND FINANCES
A joint business bank account shall be maintained. Expenditures over $5,000 require both partners' signatures.

7. PARTNER DUTIES
Each partner agrees to:
   a) Devote reasonable time to the partnership business;
   b) Act in good faith and in the best interest of the partnership;
   c) Not engage in competing businesses without prior written consent.

8. WITHDRAWAL AND BUYOUT
A partner wishing to withdraw must provide 90 days written notice. The remaining partner(s) have the right of first refusal to purchase the withdrawing partner's interest at fair market value.

9. DISSOLUTION
The partnership shall be dissolved upon:
   a) Unanimous written agreement of all partners;
   b) Death or incapacity of a partner (unless remaining partners agree to continue);
   c) Entry of a judicial dissolution decree.

10. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.governingLaw || '___________'}.

IN WITNESS WHEREOF, the partners have executed this Agreement:

PARTNER 1:
Signature: _______________________
Name: ${data.partner1Name || '___________'}
Date: _______________________

PARTNER 2:
Signature: _______________________
Name: ${data.partner2Name || '___________'}
Date: _______________________`
  },
];

export const getTemplateById = (id) => documentTemplates.find(t => t.id === id);
export const getTemplatesByCategory = (category) => documentTemplates.filter(t => t.category === category);
export const getPopularTemplates = () => documentTemplates.filter(t => t.popular);
