import React from "react"
import { Table, Button, Form, Modal} from "react-bootstrap";
import 

class Consultas extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: 0,
            medico: '',
            paciente: '',
            preco: '',
            data:'',
            hora: '',
            departamento: '',
            consultas : [
                {'id':1, 'medico': 'Joana Maria', 'paciente': 'Pedro', 'preco':250, 'data':23, 'hora':13, 'departamento':'cardiologia'},
                {'id':2, 'medico': 'Ana', 'paciente': 'João', 'preco':250, 'data':23, 'hora':13, 'departamento':'pediatra'}

            ],
            modalAberta: false
        };
    }

    componentDidMount(){
        this.buscarConsulta();  
    }

    buscarConsulta = () => {
        fetch("http://localhost:3553/consultas")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({ consultas: dados })
        });
    }

    deletarConsulta = (id) => {
        fetch(`http://localhost:3553/consultas${id}`, {method: 'DELETE'})
        .then(resposta => {
            if(resposta.ok){
                this.buscarConsulta();
            }
        })
    }

    carregarDados = (id) => {
        fetch(`http://localhost:3553/consultas${id}`, {method: 'GET'})
            .then(resposta => resposta.json())
            .then(consulta => {
                this.setState({ 
                    id:consulta.id,
                    medico: consulta.medico,
                    paciente: consulta.paciente,
                    preco: consulta.preco,
                    data: consulta.data,
                    hora: consulta.hora,
                    departamento: consulta.departamento
                })
                this.abrirModal();
            });
    }

    cadastrarConsulta = (consulta) => {
        fetch("http://localhost:3553/consultas", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(consulta)
         })
            .then(resposta => {
                if(resposta.ok) {
                    this.buscarConsulta();
                } else {
                    alert('Não foi possível adicionar a Consulta');
        }
        });
    };

    atualizarConsulta = (consulta) => {
        fetch("http://localhost:3553/consultas", {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(consulta)
         })
            .then(resposta => {
                if(resposta.ok) {
                    this.buscarConsulta();
                } else {
                    alert('Não foi possível atualizar os dados Consulta');
        }
        });
    };


    atualizaPaciente = (e) => {
        this.setState({paciente: e.target.value});
    };

    atualizaMedico = (e) => {
        this.setState({medico: e.target.value});
    };

    atualizaPreco = (e) => {
        this.setState({preco: e.target.value});
    };

     atualizaHora = (e) => {
        this.setState({hora: e.target.value});
    };
    
    atualizaData = (e) => {
        this.setState({data: e.target.value});
    };

   atualizaDepartamento = (e) => {
        this.setState({departamento: e.target.value});
    };

    submit = () => {

        if(this.state.id === 0) {
            const consulta = {
                paciente: this.state.paciente,
                medico: this.state.medico,
                preco: this.state.preco,
                data: this.state.data,
                hora: this.state.hora,
                departamento: this.state.departamento

        };

        this.cadastrarConsulta(consulta);
    } else {
            const consulta = {
            id:this.state.id,
            paciente: this.state.paciente,
            medico: this.state.medico,
            preco: this.state.preco,
            data: this.state.data,
            hora: this.state.hora,
            departamento: this.state.departamento
        }
        this.atualizarConsulta(consulta);

    }
    this.fecharModal();
}

    reset = () => {
        this.setState(
            {
                id: 0,
                paciente: '',
                medico: '',
                preco: '',
                data: '',
                hora: '',
                departamento:''
            }
        )
        this.abrirModal();
    }

    
    renderTabela = () => {
        return (
           <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Médico</th>
                        <th>Paciente</th>
                        <th>Preco</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
    
                    {this.state.consultas.map((consultas) =>
                            <tr key={consultas.id}>
                                <td> {consultas.medico} </td>
                                <td> {consultas.paciente}</td>
                                <td> {consultas.preco}</td>
                                <td> {consultas.data}</td>
                                <td> {consultas.hora}</td>
                                <td> {consultas.departamento}</td>
                                <td>
                                <Button variant="secondary" onClick={() => this.carregarDados(consultas.id)}>Atualizar</Button>
                                <Button variant="danger" onClick={() => this.deletarConsulta(consultas.id)}>Excluir</Button></td>
                            </tr>
                        )}
                </tbody>
           </Table>
        );
        };

    fecharModal = () => {
this.setState(
    {
        modalAberta:false
    }
)
        }

    abrirModal = () => {
this.setState(
    {
        modalAberta:true
    }
)
        }
    

    render() {
        return (
            <div>
     
                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>INFORMAÇÕES DA CONSULTA</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicPaciente">
                            <Form.Label>Paciente</Form.Label>
                            <Form.Control type="text" placeholder="Paciente" value={this.state.paciente} onChange={this.atualizaPaciente}/>
                            <Form.Text className="text-muted">
                            Insira o nome completo do paciente.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMédico">
                            <Form.Label>Médico</Form.Label>
                            <Form.Control type="text" placeholder="Médico"  value={this.state.medico} onChange={this.atualizaMedico}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPreço">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control type="text" placeholder="Preço"  value={this.state.preco} onChange={this.atualizaPreco}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" placeholder="Data"  value={this.state.data} onChange={this.atualizaData}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicHora">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control type="time" placeholder="Hora"  value={this.state.hora} onChange={this.atualizaHora}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDepartamento">
                            <Form.Label>Departamento</Form.Label>
                            <Form.Control type="text" placeholder="Departamento"  value={this.state.departamento} onChange={this.atualizaDepartamento} />
                        </Form.Group>
                        
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.submit}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="warning" type="submit" onClick={this.reset}>
                    Novo
                </Button>

                    {this.renderTabela()}
            </div>
        )
    }

}

export default Consultas;