import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader, Grid, Stack, Divider } from '@mui/material'

export default function ProductCard(props) {
    return (
        <>
            <Card sx={{ maxWidth: 300, textAlign: 'left' }} raised>
                <CardMedia component="img" height="200" image={props.image} />
                <Stack spacing={1} sx={{ padding: "15px" }}>
                    <Typography variant="h5" >{props.title}</Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Typography variant="subtitle1" >{`Price: $${props.price}`}</Typography>
                        <Typography variant="subtitle1" >{`Quantity: ${props.quantity}`}</Typography>
                    </Stack>
                    <Typography variant="subtitle1" >{`Brand: ${props.brand}`}</Typography>
                    <Divider sx={{ opacity: '1' }} />
                    <Typography variant="body1" color="text.secondary" align="justify">
                        {props.description}
                    </Typography>
                    <Divider sx={{ opacity: '1' }} />
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            {props.isMerchant && <Button size="small" variant="outlined" >Edit</Button>}
                        </Grid>
                    </CardActions>
                </Stack>
            </Card>
        </>
    )
}