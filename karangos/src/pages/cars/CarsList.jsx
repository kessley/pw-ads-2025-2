import React from 'react'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


export default function CarsList() {

  const columns = [
    {
      field: 'id',
      headerName: 'Cód.',
      width: 90
    },
    {
      field: 'brand',
      headerName: 'Marca e Modelo',
      width: 150,
      valueGetter: (value, row) => row.brand + ' / ' + row.model
    },
    {
      field: 'color',
      headerName: 'cor',
      width: 150
    },
    {
      field: 'year_manufacture',
      headerName: 'ano de fabricação',
      width: 150,
      valueFormatter: value => {
        if (value) {
          const date = new Date(value)
          return date.toLocaleDateString('pt-BR')
        }
        else return ''
      }
    },
    {
      field: 'imported',
      headerName: 'importado',
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value ? 'Sim' : 'Não'}
        </div>
      )
    },
    {
      field: 'plates',
      headerName: 'placas',
      width: 150
    },
    {
      field: 'selling_price',
      headerName: 'preço de venda',
      width: 250,
      valueFormatter: value => {
        if (value) {
          return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
        } else return ''
      }
    },
    {
      field: 'selling_date',
      headerName: 'data de venda',
      width: 250,
      valueFormatter: value => {
        if (value) {
          const date = new Date(value)
          return date.toLocaleDateString('pt-BR')
        }
        else return ''
      }
    }
  ];

  const [Cars, setCars] = React.useState([])



  async function loadData() {
    try {
      // Conectamos ao servidor remoto e esperamos uma resposta
      const response = await fetch('https://api.faustocintra.com.br/v2/cars')
      // Extraímos da resposta os dados em formato JSON
      const data = await response.json()
      // Armazenamos os dados na variável de estado
      setCars(data)
    }
    catch (error) {
      // Exibimos o erro no console, para efeitos de depuração
      console.error(error)
      // Informamos o erro ao usuário
      alert('ERRO: ' + error.message)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])


  return <>
    <Typography variant="h1" gutterBottom>
      Listagem de carros
    </Typography>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={Cars}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  </>


}
