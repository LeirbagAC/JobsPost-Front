'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, Input, Pagination, Typography, message 
} from 'antd';
import { 
  SearchOutlined, AppstoreFilled 
} from '@ant-design/icons';
import styles from '@/assets/css/page.module.css';

import { getJobs } from '@/service/getJobs.service';
import { deleteJob } from '@/service/deleteJob.service';
import { JobPost } from '@/types';
import JobCard from '@/ui/JobCard';
import { search } from '@/service/search.service';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const { Title, Text } = Typography;

export default function MuralDeVagas() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Coloquei os [] para não dá o erro de "Cannot read properies of undefined" por conta do jobs.length e jobs.map(). 
  //Quando o componente é montado pela primeira vez, o React Query dispara a requisição e a resposta ainda não chegou.
  //Nesse milissegundo (ou segundos), o valor de data é undefined
  const { data: jobs = [], isLoading, isError } = useQuery<JobPost[]>({
    queryKey: ['jobs', activeSearch],
    queryFn: () => activeSearch ? search(activeSearch) : getJobs(),
  }); 

  useEffect(() => {
    if(isError) message.error("Erro ao carregar as vagas.");
  }, [isError]);

  const deleteMutation = useMutation({
    mutationFn: (jobId: number) => deleteJob(jobId),
    onSuccess: () => {
      message.success("Vaga deletada com sucesso.");
      return queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
    onError: () => {
      message.success("Erro ao deletar vaga.");
    }
  });

  const pageSize = 10;
  const paginatedJobs = jobs.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
  );

  const handleSearch = () => {
    setActiveSearch(searchQuery.trim());
    setCurrentPage(1);
  };

  const handleDelete = (jobId: number) => {
    if(!isLoggedIn) {
      message.warning("Você precisa está logado para deletar uma vaga.");
      return;
    }
    deleteMutation.mutate(jobId);
  };

  const handleEdit = (postId: number) => {
     if(!isLoggedIn) {
      message.warning("Você precisa estar logado para editar uma vaga.");
      return;
    }
    router.push(`/jobPost?postId=${postId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('@jobpost:user');
    setIsLoggedIn(false);
    router.push('/');
  };

  useEffect(() => {
    const userData = localStorage.getItem('@jobpost:user');
    if(userData) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoArea}>
            <AppstoreFilled style={{ fontSize: '24px', color: '#1677ff' }} />
            <span className={styles.logoText}>HireStream</span>
          </div>

          <div className={styles.headerActions}>
            {isLoggedIn ? (
              <>
                <Button type="default" onClick={() => router.push('/jobPost')}>
                  Postar um Trabalho
                </Button>
                <Button type="primary" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => router.push('/login')} className={styles.signInBtn}>
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {/* TÍTULO DA PÁGINA */}
        <section className={styles.pageHeader}>
          <Title level={2} style={{ marginBottom: 4, fontWeight: 700 }}>Mural de Vagas</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Encontre a sua próxima grande oportunidade entre milhares de vagas em aberto.
          </Text>
        </section>

        {/* BARRA DE BUSCA PRINCIPAL */}
        <section className={styles.heroSearch}>
          <Input 
            prefix={<SearchOutlined className={styles.iconMuted} />} 
            placeholder="Cargo, habilidade ou tecnologia..." 
            variant='borderless' 
            size="large"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={() => handleSearch()}
          />
          <Button type="primary" size="large" className={styles.searchButton} onClick={() => handleSearch()}>
            Buscar Vagas
          </Button>
        </section>

        {/* GRID PRINCIPAL */}
        <div className={styles.contentGrid}>
          {/* LISTA DE VAGAS */}
          <section className={styles.jobList}>
            <div className={styles.listHeader}>
              <Text type="secondary">Exibindo <Text strong>{jobs.length > 0 ? 1 : 0} - {jobs.length}</Text> de {jobs.length} vagas</Text>
              <div className={styles.sortControls}>
              </div>
            </div>

            {/* JOBCARDS */}
            <div className={styles.cardsContainer}>
              {isLoading ? (
                <Text>Carregando vagas...</Text>
              ) : jobs.length === 0 ? (
                <Text>Nenhuma vaga encontrada.</Text>
              ) : (
                paginatedJobs.map(job => (
                  <JobCard key={job.postId} job={job} handleDelete={handleDelete} handleEdit={handleEdit}/>
                ))
              )}
            </div>
            
            <div className={styles.paginationArea}>
              <Pagination defaultCurrent={currentPage} 
              total={jobs.length} 
              showSizeChanger={false} 
              pageSize={10} 
              onChange={(page) => setCurrentPage(page)} 
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}