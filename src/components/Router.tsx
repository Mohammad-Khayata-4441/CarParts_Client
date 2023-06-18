import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/components/layouts/Dashboard'
import FullScreen from '@/components/layouts/FullScreen'

const Home = React.lazy(() => import('../pages/Home'))
const Login = React.lazy(() => import('../pages/Login'))
const Brands = React.lazy(() => import('../pages/Brands'))
const Cars = React.lazy(() => import('../features/cars/car.view'))
const Parts = React.lazy(() => import('../features/parts/parts.view'))
const Invoces = React.lazy(() => import('../features/invoices/invoice.view'))
const Accounting = React.lazy(() => import('../pages/Accounting'))
const Inventories = React.lazy(() => import('../pages/Inventories'))
const Clients = React.lazy(() => import('@/features/clients/clients.view'))
const Settings = React.lazy(() => import('@/features/settings/settings.view'))

const Countries = React.lazy(() => import('../pages/Countries'));
function Router() {
    const routes = [
        {
            layout: Dashboard,
            name: Home,
            path: '/'
        },
        {
            layout: Dashboard,
            name: Brands,
            path: '/brands'
        },
        {
            layout: Dashboard,
            name: Cars,
            path: '/cars'
        },
        {
            layout: Dashboard,
            name: Countries,
            path: '/countries'
        },
        {
            layout: Dashboard,
            name: Parts,
            path: '/products'
        },
        {
            layout: Dashboard,
            name: Invoces,
            path: '/invoces'
        },
        {
            layout: Dashboard,
            name: Accounting,
            path: '/accounting'
        },
        {
            layout: Dashboard,
            name: Settings,
            path: '/settings'
        },
        {
            layout: Dashboard,
            name: Inventories,
            path: '/inventories'
        },
        {
            layout: Dashboard,
            name: Clients,
            path: '/clients'
        },
        {
            layout: FullScreen,
            name: Login,
            path: '/login'
        },

    ]

    return (
        <Routes>
            {routes.map((Ele, i) => (
                <Route key={i} element={
                    <Ele.layout>
                        <Suspense fallback={'Loading Some Thing'}>
                            <main >
                                <Ele.name />

                            </main>
                        </Suspense>
                    </Ele.layout>
                } path={Ele.path} >
                </Route>
            ))}
        </Routes>
    )
}

export default Router