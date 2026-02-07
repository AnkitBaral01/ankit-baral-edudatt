const ENV = process.env.NEXT_PUBLIC_APP_ENV || "DEV";

const environments = {
    DEV: {
        API: {
            API_URL: process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3001/api'
        }
    },
    STAGE: {
        API: {
            API_URL: process.env.NEXT_PUBLIC_API_URI || 'https://dev-api.edudatt.com/api'
        }
    },
    PROD: {
        API: {
            API_URL: process.env.NEXT_PUBLIC_API_URI || 'https://dev-api.edudatt.com/api'
        }
    }
}

const defaults = {
    DEFAULT_IMAGE: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s",
    WEB_URL: "https://edudatt.com",
    LOADING_TIME: 1000
}

const WHITELISTED_ROUTES = [
    "/login"
]

const PROTECTED_ROUTES = [
    "/dashboard",
    "/dashboard/calendar",
    "/dashboard/school",
    "/dashboard/school/link-child",
    "/dashboard/profile",
    "/dashboard/details",
    "/dashboard/details/class-news",
    "/dashboard/details/progress-card",
    "/dashboard/details/attendance",
]

const CONSTANTS = {
    ENVIRONMENT: environments[ENV],
    DEFAULTS: defaults,
    WHITELISTED_ROUTES: WHITELISTED_ROUTES,
    PROTECTED_ROUTES: PROTECTED_ROUTES,
    ENV: ENV
}

export default CONSTANTS;