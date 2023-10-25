import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Forward from '@material-ui/icons/Forward'

const styles = {
    card: {
        minWidth: 275,
        margin: '1em 0'
    },
    titleLayout: {
        display: 'flex',
        alignItem: 'center'
    },
    actionLayout: {
        display: 'flex',
        justifyContent: 'right'
    }
}

const ProvideCard = (props) => {
    const { classes, title, descrbtion, to } = props
    const { TitleIcon } = props
    const history = useHistory()
    const handleClick = () => {
        history.push(to.path)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography
                    className={classes.titleLayout}
                    variant='h5'
                >
                    {!!TitleIcon ? <TitleIcon style={{margin: '0 5px'}} fontSize='medium' /> : ''}
                    {title}
                </Typography>
                <Typography component='p'>{descrbtion}</Typography>
            </CardContent>
            <CardActions className={classes.actionLayout}>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={handleClick}
                >
                    <Forward />
                    {to.name}
                </Button>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(ProvideCard)
