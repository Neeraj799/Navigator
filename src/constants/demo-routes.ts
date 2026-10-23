// Fixed assignment fixtures. These are not calculated from the selected addresses.
export const demoRoutes = {
  Drive: { minutes: 24, distance: '9.6 km', traffic: 'Heavy traffic near the marina', steps: [
    { title: 'Head north on Street 840', detail: 'Keep right past the service road', distance: '450 m' },
    { title: 'Turn right onto Al Istiqlal St', detail: 'Moderate traffic near the roundabout', distance: '1.8 km' },
  ] },
  Ride: { minutes: 38, distance: '8.2 km', traffic: 'Demo cycling route via the waterfront', steps: [
    { title: 'Ride north on Street 840', detail: 'Follow the marked cycle lane', distance: '450 m' },
    { title: 'Join the waterfront cycle path', detail: 'Continue towards the marina', distance: '1.4 km' },
  ] },
  Walk: { minutes: 112, distance: '7.8 km', traffic: 'Demo walking route via the promenade', steps: [
    { title: 'Walk north on Street 840', detail: 'Follow the pavement to the crossing', distance: '300 m' },
    { title: 'Turn right towards the promenade', detail: 'Use the pedestrian crossing', distance: '900 m' },
  ] },
} as const;

export type TravelMode = keyof typeof demoRoutes;
