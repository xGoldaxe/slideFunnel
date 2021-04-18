import React, { useState } from 'react';
import Tab from './Tab';

export default function BlockRouter({actualRoute, routes, defaultRoute}) {
    const index = routes.findIndex(function findRoute (route) {
        return route.name == actualRoute
    })
    return index != -1 ? routes[index].component : defaultRoute
}
