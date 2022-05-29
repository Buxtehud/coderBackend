export default {
    fileSystem: {
        path: './DB'
    },
    mariadb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite3'
        },
        useNullAsDefault: true
    },
    mongodb: {
        URL: 'mongodb://127.0.0.1:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
    "type": "service_account",
    "project_id": "backend-coder-7a384",
    "private_key_id": "37778bd45ce58a149e52481e7326c53e98678aad",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLUbKp0259XSKT\naOaonP5rwU//uCle7zGGbNpiMOL2QecjqQpMR4h9MWOWFUB7gxsFBpq+HbPMT7Tk\nCG9N9ztiifamjxKQF3T8BT83jndTVhmy0k/tDf8EtMnaTUF2nWLB6rU6Ag4w1tvc\nLwAoNWRp66sAdJgu/l3a1mXBQNFkHwEVMg4ocgX9c9IxcK1GMWxMpA9EU6FYoO3U\niyqTjRsaIHGvK1DxElPS8k5VCK8d+cdseJXFHinvwSrvEp0mmosIw7N7pNR+4g4v\naUby83aGYvBqcm/dS7mhiIfU5ZaqYLr0mtwu3pM7f+nKzP9jGLgwgNHydRiVc63p\nm4c9TVQLAgMBAAECggEALbXKYx/jwU+FDHsTEGlrUbJ+V9GBi5RfIAes+VJgVFjw\nrDW+2PNkHjFSYFWaz6nkEzcu5vsqhw6Mbo/u5iplMXwu9bdIxxhe9qH/WnAvJ489\n69QYoAT7hoVWtDuWMiKkJ1CrOcVoh1Zmy5PNhzypvJ59LXcJF9ecJiz5Z385FDb1\nTS84flHBDm8jm9pXrXG1n6ZY/cG4JiVdEVEadfQA3AL2Yx+cYd1D+ZHjAy3fNQit\n+NmdRUtZlMOQW73xJepMU6a6hosVRBafYx4N/AS4N0wWHi4H4NGmAClqy6Ad7pxm\ncY3Y4JxMlrmlHBQbmWBgdelnBa1yh3rw6KWKKQXzcQKBgQD3ckkzgq+SryzF6EFx\n9uhT0cY8I9pHPQyGhLw9WOUFXzC2k6ZzZQDxR3ANWqvjRhPS5qI4fE33NO9NJGHn\n9XqcJrtNCnkat7hqLnLGDndPeRKGpf2EXzCbk0y8sPCzJrbpIYDvALAYIIuStvxE\nJs08wxO5cV71v4A5sfk0LxuVjQKBgQDSWOswGsqyaF79XG/FD4femSsqhSp43Qn5\nmHd3RVEO0JapLNvr8UyrpL1IgAdXI3sDZ16C1Tm3pRTYEfTWEUTeInCuNmqFfom7\ndtfV0bU986EB7lyyzSJ4VpeetmAZS0JRLrsWYqru1pkXNmeenGC3igcFIUYWPYON\nuwyTFs9t9wKBgEmhIzEFqRK/t1XoZ1ju/HC8kf0hOflKrCh25MBobDVt/sPFKZla\nq64f8LK4kT8eghWWdRzTuCtf//j3Y36vJ93BFKi2/hQ6KNDHo3VVpqDqSN3yFH7I\nCGGysfnPuL/GPFUgmAoGLV/whzeP5X6uARIchgj/OB9t7Uy9rYaeodmdAoGBAKIp\nYscnIHUB+Zkhlhk5q+lz889H8kJTRcliPVd53M+rBztNFg6DbDQ3QKWP7hjDhaZO\nHpKGh4SIg9U/op0Vmx4VNwFXei+IKe6X5DU3Ap7MH6g5dsVxV82mFCWLO/LEDlA/\n0oOjdVvDnSpECwZAUF+uzVKrIDktGyo8taj/wNJpAoGAOtZSyUbQvLDuh2IrKUfK\nn4EseDjcZgJ4erRK0oacH62S3sBBrDRZtyxfwrp/9L+K8NI9A42FAZ2q3jCfjH8t\nJSEhgDSa9NxJRaz77KVA+wIv7E/hRbBf66NVWaUB9LqOlc9eYwNrZkpYjZoFcxo3\nICg/GX2sroRZxhy/dS2If5Y=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-8fctu@backend-coder-7a384.iam.gserviceaccount.com",
    "client_id": "110753401417441856594",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8fctu%40backend-coder-7a384.iam.gserviceaccount.com"
    }
}