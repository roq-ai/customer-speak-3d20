const mapping: Record<string, string> = {
  businesses: 'business',
  'customer-feedbacks': 'customer_feedback',
  dashboards: 'dashboard',
  'feedback-forms': 'feedback_form',
  'feedback-options': 'feedback_option',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
