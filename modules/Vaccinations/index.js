import { gql } from 'apollo-server';
import { createModule } from 'graphql-modules';
import fetch from 'node-fetch';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vaccinationResolvers = {
  Query: {
    vaccinationData: async () => {
      const data = await fetch('https://cekdiri.id/vaksinasi/').then((res) => res.json());
      return data;
    },
  },
}

const vaccinationModule = createModule({
  id: 'vaccination',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        vaccinationData: VaccinationData
      }
      type VaccinationStage {
        sudah_vaksin1: Int
        sudah_vaksin2: Int
        tertunda_vaksin1: Int
        tertunda_vaksin2: Int
        total_vaksinasi1: Int
        total_vaksinasi2: Int
      }
      type VaccinationStages {
        kelompok_usia_12_17: VaccinationStage
        masyarakat_umum: VaccinationStage
        lansia: VaccinationStage
        petugas_publik: VaccinationStage
        sdm_kesehatan: VaccinationStage
      }
      type VaccinationCakupan {
        kelompok_usia_12_17_vaksinasi1: String
        kelompok_usia_12_17_vaksinasi2: String
        masyarakat_umum_vaksinasi1: String
        masyarakat_umum_vaksinasi2: String
        lansia_vaksinasi1: String
        lansia_vaksinasi2: String
        petugas_publik_vaksinasi1: String
        petugas_publik_vaksinasi2: String
        sdm_kesehatan_vaksinasi1: String
        sdm_kesehatan_vaksinasi2: String
        vaksinasi1: String
        vaksinasi2: String
      }
      type VaccinationDetails {
        cakupan: VaccinationCakupan
        date: String
        sasaran_vaksinasi_masyarakat_umum: Int
        sasaran_vaksinasi_kelompok_1217: Int
        sasaran_vaksinasi_lansia: Int
        sasaran_vaksinasi_petugas_publik: Int
        sasaran_vaksinasi_sdmk: Int
      }
      type VaccinationData {
        last_updated: String
        monitoring: [VaccinationDetails]
      }
    `,
  ],
  resolvers: [vaccinationResolvers]
});

export default vaccinationModule;
