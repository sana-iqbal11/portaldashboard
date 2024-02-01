const navigation = () => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Dashboard',
      path: '/dashboards/crm'
    },
    {
      title: 'HR Management',
      icon: 'tabler:users',
      children: [
        {
          title: 'User Management',
          path: '/apps/userManagement'
        },
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    },

    {
      icon: 'tabler:building',
      title: 'Assets Management',
      children: [
        {
          title: 'Routes',
          path: '/apps/routes'
        },
        {
          title: 'Sites',
          path: '/apps/sites'
        },
        { title: 'Questionnaires', path: '/apps/questionnaires' },
        {
          title: 'Groups',
          path: '/apps/groups'
        }
      ]
    },

    {
      title: 'Reports',
      icon: 'tabler:checklist',
      children: [
        {
          title: 'Users Reports',
          path: '/apps/userView/UsersReports'
        },
        {
          title: 'Sites Reports',
          path: '/apps/userView/SitesReport'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'tabler:settings',
      path: '/setting'
    }
  ]
}

export default navigation
