import React, { use } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FotoPerfil from '../../assets/FotoPerfil.jpg';


export default function Coponents() {

      const [like, setLike] = React.useState(
    () => Number(window.localStorage.getItem('likes')) ?? 0
  )

  React.useEffect(() => {
    window.localStorage.setItem('likes', like)
  }, [like])

  return <>
    <Typography variant="h1">
     SOBRE O AUTOR
   </Typography>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="foto de perfil"
        height="380"
        image={FotoPerfil}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Kessley Moreno Ramos
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Aluno da fatec no curso de ads fazendo a prova 2 de web.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medio" onClick={() => setLike(like + 1)}>Curtir: {like}</Button>
      </CardActions>
    </Card>
  </>
}