import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';


import './style.css';



function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

       const response = await api.get('classes', {
            params : {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);

       
       
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value )}}
                        options={[
                            { value: 'Base de dados', label: 'Base de dados' },
                            { value: 'Redes', label: 'Redes' },
                            { value: 'Sistemas Operacionais', label: 'Sistemas Operacionais' },
                            { value: 'Programação Orientada a Objectos', label: 'Programação Orientada a Objectos' },
                            { value: 'Lógica de Programação', label: 'Lógica de Programação' },
                            { value: 'Microprocessadores', label: 'Microprocessadores' },
                            { value: 'Álgebra', label: 'Álgebra' },
                            { value: 'Matemática Aplicada', label: 'Matemática Aplicada' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => { setWeek_day(e.target.value )}}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },

                        ]}
                    />

                    <Input 
                    type="time" 
                    name="time" 
                    label="Hora" 
                    value={time}
                    onChange={e => { setTime(e.target.value )}}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key= {teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;