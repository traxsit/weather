/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react';
import React, { useEffect, useState } from "react";
import { Menu, Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import {Line} from 'react-chartjs-2';
import axios from "axios";
import LineChart from "./components/LineChart.js";




const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://www.svgrepo.com/show/357537/cog.svg',
}


const stats = [
  { name: 'Temperature', stat: '21.2°C' },
  { name: 'Sun Intensity', stat: '27%' },
  { name: 'Humidity', stat: '75%' },
  { name: 'Rain Today', stat: '0.86mm' },
  { name: 'Rain This Week', stat: '2.41mm' },
  { name: 'Ground Moisture', stat: '24.57%' },
]

const people = [
  {
    name: 'Temperature',
    email: '20.78°C',
    image:
    'https://www.svgrepo.com/show/242016/temperature.svg',
  },
  {
    name: 'Rainfall',
    email: '0.53mm',
    image:
      'https://www.svgrepo.com/show/310213/weather-drizzle.svg',
  },
  {
    name: 'Rain Forecast',
    email: '28% Chance',
    image:
      'https://www.svgrepo.com/show/59320/rain.svg',
  },
  {
    name: 'Conditions',
    email: 'Sunny',
    image:
      'https://www.svgrepo.com/show/889/sun.svg',
  },
  {
    name: 'Wind Speed',
    email: '3.8km/h',
    image:
      'https://www.svgrepo.com/show/80461/wind.svg',
  },
]

const tabs = [
  { name: 'Today', href: '#', current: true },
  { name: 'Yesterday', href: '#', current: false },
  { name: 'This Week', href: '#', current: false },
  { name: 'This Month', href: '#', current: false },
]
const navigation = [
  { name: 'Home', href: '#', current: true },

]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {

  const [weather, setWeather] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
    .get("https://api.openweathermap.org/data/2.5/weather?lat=51.3453&lon=-8.34534&appid=5c32c05225d197305070784e67626eba&units=metric")
    .then((res) => {
      console.log(res);
      setWeather(res.data);
    })
  };

  return (
    <>
  
      <div className="min-h-full">
        <Popover as="header" className="pb-24 bg-indigo-600">
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative py-5 flex items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 text-indigo-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>



                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>
                </div>

              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                              <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            {/* Top Row */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <div className="max-w-7xl bg-white rounded-lg  shadow mx-auto sm:px-6 lg:px-8">
                  <h3 className="text-2xl leading-6 font-medium text-gray-900 py-2 px-2 ">Live Video</h3>
                    <div className="px-4 py-4 sm:px-0">
                      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                      <iframe id="cc9594f9-f0eb-6103-b276-3db6bf1d67ce" src="https://iframe.dacast.com/live/acd61f54-2d9e-9f22-07aa-5f0a8c815e61/cc9594f9-f0eb-6103-b276-3db6bf1d67ce" width="100%" height="100%">
                      </iframe>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <div className="max-w-7xl bg-white rounded-lg  shadow mx-auto sm:px-6 lg:px-8">
                  <h3 className="text-2xl leading-6 font-medium text-gray-900 py-2 px-2 ">Forecast</h3>
                    <div className="px-4 py-4 sm:px-0">
                      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                        <div className="px-4 py-4">
                          <ul role="list" className="divide-y divide-gray-200">
                          {people.map((person) => (
                            <li key={person.email} className="py-3 flex">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                <p className="text-sm text-gray-500">{person.email}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        </div> 
                      </div>                      
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <div>
              <div>
                <h3 className="text-2xl leading-8 font-medium text-gray-900 py-2">Live Weather</h3>
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                  <div className="hidden sm:block">
                    <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                      {tabs.map((tab, tabIdx) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                            tabIdx === 0 ? 'rounded-l-lg' : '',
                            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                          )}
                          aria-current={tab.current ? 'page' : undefined}
                        >
                          <span>{tab.name}</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              tab.current ? 'bg-indigo-500' : 'bg-transparent',
                              'absolute inset-x-0 bottom-0 h-0.5'
                            )}
                          />
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          

          {/* Bottom Row */}
          <div className="max-w-3xl mx-auto px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
              <div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2022 Traxsit Limited.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
