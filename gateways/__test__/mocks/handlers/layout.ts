import { graphql, HttpResponse } from 'msw'

export const layout = graphql.query('Layout', () => {
  return HttpResponse.json({
    data: {
      SystemStatus: {
        data: {
          result: {
            host_name: 'vyos-lperdereau-1',
            version: {
              version: '1.5-rolling-202501200007',
              flavor: 'generic',
              built_by: 'autobuild@vyos.net',
              built_on: 'Mon 20 Jan 2025 00:07 UTC',
              build_uuid: '3cb57d42-3f6e-46c4-be91-cf91c1943226',
              build_git: 'e850eb8854d52b',
              build_branch: 'current',
              release_train: 'current',
              architecture: 'amd64',
              build_type: 'release',
              build_comment: '',
              bugtracker_url: 'https://vyos.dev',
              documentation_url: 'https://docs.vyos.io/en/latest',
              project_news_url: 'https://blog.vyos.io',
              support_url: 'https://support.vyos.io',
              system_arch: 'x86_64',
              system_type: 'KVM guest',
              boot_via: 'installed image',
              hardware_vendor: 'QEMU',
              hardware_model: 'Standard PC (Q35 + ICH9, 2009)',
              hardware_serial: '',
              hardware_uuid: '8bac6418-251c-4e68-8a48-815630e0de86',
              secure_boot: 'n/a (BIOS)',
            },
            uptime: {
              uptime: '2h 20m 19s',
              load_average: {
                1: 0,
                5: 0,
                15: 0,
              },
            },
            ram: {
              total: 2081341440,
              free: 1563451392,
              used: 517890048,
              buffers: 7647232,
              cached: 428724224,
            },
          },
        },
        errors: null,
        success: true,
      },
    },
  })
})
