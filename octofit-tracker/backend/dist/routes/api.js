"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../config/api");
const router = (0, express_1.Router)();
const users = [
    { id: 'user-1', name: 'Ava', email: 'ava@example.com', role: 'runner' },
    { id: 'user-2', name: 'Noah', email: 'noah@example.com', role: 'coach' }
];
const teams = [
    { id: 'team-1', name: 'Momentum', members: 12, focus: 'endurance' },
    { id: 'team-2', name: 'Peak', members: 9, focus: 'strength' }
];
const activities = [
    { id: 'activity-1', type: 'run', duration: 30, distance: 5.2 },
    { id: 'activity-2', type: 'cycling', duration: 45, distance: 18.4 }
];
const leaderboard = [
    { id: 'leader-1', userId: 'user-1', points: 1420, rank: 1 },
    { id: 'leader-2', userId: 'user-2', points: 1290, rank: 2 }
];
const workouts = [
    { id: 'workout-1', name: 'Morning Mobility', duration: 20, level: 'easy' },
    { id: 'workout-2', name: 'Power Intervals', duration: 35, level: 'hard' }
];
function createResourceRouter(resource, resourceName) {
    const resourceRouter = (0, express_1.Router)();
    resourceRouter.get(['/', '/'], (_req, res) => {
        res.json(resource);
    });
    resourceRouter.post(['/', '/'], (req, res) => {
        const item = { ...req.body, id: `${resourceName}-${Date.now()}` };
        resource.push(item);
        res.status(201).json(item);
    });
    return resourceRouter;
}
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
router.get('/config', (_req, res) => {
    const apiBaseUrl = (0, api_1.getApiBaseUrl)();
    res.json({ apiBaseUrl, port: 8000, codespaces: Boolean(process.env.CODESPACE_NAME) });
});
router.use('/users', createResourceRouter(users, 'user'));
router.use('/teams', createResourceRouter(teams, 'team'));
router.use('/activities', createResourceRouter(activities, 'activity'));
router.use('/leaderboard', createResourceRouter(leaderboard, 'leader'));
router.use('/workouts', createResourceRouter(workouts, 'workout'));
exports.default = router;
