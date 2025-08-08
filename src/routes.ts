import { PageCustomForm } from './pages/PageCustomForm.js'
import { PageCustomUpload } from './pages/PageCustomUpload.js'
import { PageHome } from './pages/PageHome.js'
import { PageRefForm } from './pages/PageRefForm.js'
import { PageRefRemoteForm } from './pages/PageRefRemoteForm.js'
import { PageSimpleForm } from './pages/PageSimpleForm.js'

export const routes = [
    {path: '/', name: 'Home', Component: PageHome},
    {path: '/simple', name: 'Simple Form', Component: PageSimpleForm},
    {path: '/custom', name: 'Custom Rendering', Component: PageCustomForm},
    {path: '/custom-upload', name: 'File Upload', Component: PageCustomUpload},
    {path: '/ref', name: 'Ref Form', Component: PageRefForm},
    {path: '/ref-remote', name: 'Ref Remote Form', Component: PageRefRemoteForm},
]
