export interface ProjectItem {
  project_id: string;
  project_name: string;
  address: string;
  city: string;
  county: string;
  asset_class: 'apartment' | 'student' | 'ALF' | 'RCF' | 'hotel' | 'mixed';
  affordable_flag: boolean;
  stage: 'planning' | 'intake' | 'plan_review' | 'issued' | 'under_construction' | 'CO';
  jurisdiction: string;
  permit_or_case_number: string;
  valuation_usd: number;
  units_or_keys: number;
  developer: string;
  gc_name: string;
  gc_ccb: string;
  lead_score: number;
  cabinet_opportunity: 'rough-in' | 'millwork package' | 'unknown';
  status: 'watch' | 'outreach_ready' | 'in_conversation' | 'won';
  lat: number;
  lng: number;
  first_seen: string;
}

export const SEED_PROJECTS: ProjectItem[] = [
  {
    project_id: 'PRJ-2026-001',
    project_name: 'Pringle Creek Commons Phase 2',
    address: '1480 21st St SE',
    city: 'Salem',
    county: 'Marion',
    asset_class: 'apartment',
    affordable_flag: false,
    stage: 'plan_review',
    jurisdiction: 'City of Salem',
    permit_or_case_number: '26-104921-BP',
    valuation_usd: 14800000,
    units_or_keys: 84,
    developer: 'Clutch Capital Partners',
    gc_name: 'Sharpcor Construction',
    gc_ccb: '219482',
    lead_score: 5,
    cabinet_opportunity: 'millwork package',
    status: 'outreach_ready',
    lat: 44.9221,
    lng: -123.0185,
    first_seen: '2026-07-15T00:00:00Z'
  },
  {
    project_id: 'PRJ-2026-002',
    project_name: 'Turner Road Garden Flats',
    address: '2985 Turner Rd SE',
    city: 'Salem',
    county: 'Marion',
    asset_class: 'apartment',
    affordable_flag: false,
    stage: 'intake',
    jurisdiction: 'City of Salem PAC',
    permit_or_case_number: '26-118804-PAC',
    valuation_usd: 22500000,
    units_or_keys: 124,
    developer: 'Santiam Properties',
    gc_name: 'Sharpcor Construction',
    gc_ccb: '219482',
    lead_score: 5,
    cabinet_opportunity: 'rough-in',
    status: 'watch',
    lat: 44.9125,
    lng: -123.0012,
    first_seen: '2026-08-01T00:00:00Z'
  },
  {
    project_id: 'PRJ-2026-003',
    project_name: 'Liberty Mixed-Use & Residences',
    address: '445 Liberty St SE',
    city: 'Salem',
    county: 'Marion',
    asset_class: 'mixed',
    affordable_flag: false,
    stage: 'under_construction',
    jurisdiction: 'City of Salem',
    permit_or_case_number: '25-109244-BP',
    valuation_usd: 18200000,
    units_or_keys: 68,
    developer: 'Liberty West Partners',
    gc_name: 'Rich Duncan Construction',
    gc_ccb: '151128',
    lead_score: 4,
    cabinet_opportunity: 'millwork package',
    status: 'in_conversation',
    lat: 44.9388,
    lng: -123.0410,
    first_seen: '2026-03-10T00:00:00Z'
  },
  {
    project_id: 'PRJ-2026-004',
    project_name: 'Wallace River Flats',
    address: '1120 Wallace Rd NW',
    city: 'Salem',
    county: 'Polk',
    asset_class: 'apartment',
    affordable_flag: false,
    stage: 'issued',
    jurisdiction: 'Polk County',
    permit_or_case_number: '26-POLK-771',
    valuation_usd: 11400000,
    units_or_keys: 54,
    developer: 'Neighborly Ventures',
    gc_name: 'Rich Duncan Construction',
    gc_ccb: '151128',
    lead_score: 4,
    cabinet_opportunity: 'rough-in',
    status: 'outreach_ready',
    lat: 44.9540,
    lng: -123.0531,
    first_seen: '2026-06-20T00:00:00Z'
  },
  {
    project_id: 'PRJ-2026-005',
    project_name: 'Columbia View Apartments',
    address: '8820 NE Prescott St',
    city: 'Portland',
    county: 'Multnomah',
    asset_class: 'apartment',
    affordable_flag: true,
    stage: 'under_construction',
    jurisdiction: 'City of Portland',
    permit_or_case_number: '25-189320-CO',
    valuation_usd: 34000000,
    units_or_keys: 110,
    developer: 'Home Forward',
    gc_name: 'Walsh Construction Co.',
    gc_ccb: '147415',
    lead_score: 5,
    cabinet_opportunity: 'millwork package',
    status: 'in_conversation',
    lat: 45.5562,
    lng: -122.5714,
    first_seen: '2026-02-14T00:00:00Z'
  }
];

export const SEED_BUILDERS = [
  {
    id: 'b-sharpcor',
    name: 'Sharpcor Construction',
    hq_city: 'Salem',
    ccb_number: '219482',
    typical_product: 'Garden Multifamily',
    counties_active: ['Marion', 'Polk', 'Linn'],
    website: 'https://sharpcor.com',
    tags: ['Salem Core', 'Repeat Multifamily']
  },
  {
    id: 'b-duncan',
    name: 'Rich Duncan Construction',
    hq_city: 'Salem',
    ccb_number: '151128',
    typical_product: 'Mid-Rise & Commercial',
    counties_active: ['Marion', 'Polk', 'Yamhill'],
    website: 'https://richduncanconstruction.com',
    tags: ['Willamette Valley Heavyweight', 'Commercial & Multi']
  },
  {
    id: 'b-walsh',
    name: 'Walsh Construction Co.',
    hq_city: 'Portland',
    ccb_number: '147415',
    typical_product: 'Affordable / LIHTC',
    counties_active: ['Multnomah', 'Washington', 'Lane'],
    website: 'https://walshconstruction.com',
    tags: ['Affordable Leader', 'Mass Timber']
  }
];
