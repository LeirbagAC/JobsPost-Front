'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, Input, Tag, Pagination, Typography, message 
} from 'antd';
import { 
  SearchOutlined, AppstoreFilled 
} from '@ant-design/icons';
import styles from '@/assets/css/page.module.css';
import { getJobs } from '@/service/getJobs.service';
import { JobPost } from '@/types';
import JobCard from '@/ui/JobCard';

const { Title, Text } = Typography;

export default function MuralDeVagas() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobPost[]>([]);


  const fetchJobs = async() => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      message.error("Erro ao carregar as vagas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoArea}>
            <AppstoreFilled style={{ fontSize: '24px', color: '#1677ff' }} />
            <span className={styles.logoText}>HireStream</span>
          </div>
          
          <Input 
            prefix={<SearchOutlined className={styles.iconMuted} />} 
            placeholder="Pesquisar vagas..." 
            className={styles.headerSearch}
            variant="borderless"
          />

          <div className={styles.headerActions}>
            <Button type="primary" onClick={() => router.push('/login')} className={styles.signInBtn}>Entrar</Button>
            <Button type="default" onClick={() => router.push('/jobPost')} >Post a Job</Button>
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
            placeholder="Cargo, habilidade ou empresa" 
            bordered={false} 
            size="large"
            className={styles.searchInput}
          />
          <Button type="primary" size="large" className={styles.searchButton}>
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
              {loading ? (
                <Text>Carregando vagas...</Text>
              ) : jobs.length === 0 ? (
                <Text>Nenhuma vaga encontrada.</Text>
              ) : (
                jobs.map(job => (
                  <JobCard key={job.postId} job={job} />
                ))
              )}
            </div>
            
            <div className={styles.paginationArea}>
              <Pagination defaultCurrent={1} total={jobs.length} showSizeChanger={false} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}