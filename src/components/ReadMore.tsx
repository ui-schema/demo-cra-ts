import { ReactNode, useId, useState } from 'react'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface ReadMoreProps {
    children: ReactNode
    initialHeight?: number
}

export const ReadMore = ({children, initialHeight = 46}: ReadMoreProps) => {
    const uid = useId()
    const [expanded, setExpanded] = useState(false)

    const handleToggle = () => {
        setExpanded(!expanded)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{order: 2}}>
                <Button
                    onClick={handleToggle} size="small" sx={{mt: 1}}
                    aria-controls={uid}
                    aria-expanded={expanded}
                    id={`expand-button-${uid}`}
                >
                    {expanded ? 'View Less' : 'Read More'}
                </Button>
            </Box>
            <Collapse
                id={uid}
                in={expanded}
                collapsedSize={initialHeight}
                sx={{
                    order: 1,
                    ...!expanded ? {
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    } : {},
                }}
                onClick={expanded ? undefined : () => handleToggle()}
            >
                <Box inert={!expanded}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    )
}
