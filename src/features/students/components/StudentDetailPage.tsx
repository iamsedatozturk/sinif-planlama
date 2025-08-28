/**
 * Detaylı Öğrenci Yönetim Sayfası
 * Ekran görüntülerindeki tasarıma uygun olarak oluşturuldu
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useL } from "@/shared/lang/LanguageProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaBuilding,
  FaGraduationCap,
  FaRegCommentDots,
  FaSave,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaTrash,
  FaCalendar,
  FaRegComment,
} from "react-icons/fa";

interface StudentDetail {
  id: string;
  studentNumber: string;
  fullName: string;
  photoUrl: string | null;
  interestArea: string;
  registrationDate: string;
  branch: string;
  source: string;
  sourceLocation: string;
  webPortal: string | null;
  followUpTime: string;
  contactLevel: string;
  contactScore: number;
  companyName: string | null;
  phone1: string | null;
  phone2: string | null;
  communicationApproval: boolean;
  mobileAppUsage: boolean;

  // Genel Bilgiler
  tcNumber: string | null;
  gender: string | null;
  birthDate: string | null;
  birthPlace: string | null;
  country: string;
  city: string | null;
  district: string | null;
  neighborhood: string | null;
  homeAddress: string | null;
  taxNumber: string | null;

  // Nüfus Bilgileri
  fatherName: string | null;
  motherName: string | null;
  fatherPhone: string | null;
  motherPhone: string | null;
  fatherEmail: string | null;
  motherEmail: string | null;
  bloodGroup: string | null;
  maritalStatus: string | null;
  marriageDate: string | null;

  // İş Bilgileri
  sector: string | null;
  profession: string | null;
  workPhone: string | null;
  workFax: string | null;
  workAddress: string | null;
  taxOffice: string | null;
}

interface Interview {
  id: string;
  serialNumber: number;
  interviewDate: string;
  interviewer: string;
  branch: string;
  interviewType: string;
  interviewResult: string;
  nextCallDate: string | null;
}

interface ProgramSale {
  id: string;
  serialNumber: number;
  dossier: string;
  interviewer: string;
  registrationDate: string;
  branch: string;
  registrationType: string;
  programName: string;
  classType: string;
  startLevel: string;
  activeLevel: string;
  courseCount: number;
  lessonCount: number;
  duration: string;
  status: string;
  totalAmount: number;
  paymentAmount: number;
  debt: number;
  discount: number;
  installmentCount: number;
}

interface StudentNote {
  id: string;
  noteDate: string;
  loginName: string;
  noteType: string;
  noteContent: string;
  processDate: string;
  isCompleted: boolean;
}

export const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useL();

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [programSales, setProgramSales] = useState<ProgramSale[]>([]);
  const [studentNotes, setStudentNotes] = useState<StudentNote[]>([]);
  const [activeTab, setActiveTab] = useState("interviews");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - gerçek API entegrasyonu yapılacak
  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setStudent({
        id: id || "1",
        studentNumber: "002262",
        fullName: "RAMAZAN İLGİN",
        photoUrl:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        interestArea: "Kişisel Gelişim",
        registrationDate: "2025-08-14",
        branch: "Demo",
        source: "REFERANS",
        sourceLocation: "Bireysel",
        webPortal: null,
        followUpTime: "Haftaiçi",
        contactLevel: "A1",
        contactScore: 0.0,
        companyName: "AYDIN DUMAN DRAMA",
        phone1: "(555) 555-5555",
        phone2: null,
        communicationApproval: true,
        mobileAppUsage: false,

        tcNumber: "11111111111",
        gender: "Bay",
        birthDate: null,
        birthPlace: null,
        country: "Türkiye",
        city: null,
        district: null,
        neighborhood: null,
        homeAddress: "İÇMELER MH. KOÇAK SK. NO:9 D:1",
        taxNumber: null,

        fatherName: null,
        motherName: null,
        fatherPhone: null,
        motherPhone: null,
        fatherEmail: null,
        motherEmail: null,
        bloodGroup: null,
        maritalStatus: null,
        marriageDate: null,

        sector: null,
        profession: null,
        workPhone: null,
        workFax: null,
        workAddress: null,
        taxOffice: null,
      });

      setInterviews([
        {
          id: "1",
          serialNumber: 3,
          interviewDate: "2016-05-17 00:00",
          interviewer: "özlem",
          branch: "Demo",
          interviewType: "SHOW",
          interviewResult: "YENİ KAYIT",
          nextCallDate: null,
        },
        {
          id: "2",
          serialNumber: 2,
          interviewDate: "2016-05-17 00:00",
          interviewer: "özlem",
          branch: "Demo",
          interviewType: "SHOW",
          interviewResult: "YENİ KAYIT",
          nextCallDate: null,
        },
      ]);

      setProgramSales([
        {
          id: "1",
          serialNumber: 810,
          dossier: "özlem",
          interviewer: "YENİ KAYIT",
          registrationDate: "2016-05-17",
          branch: "Demo",
          registrationType: "Normal Paket",
          programName: "Genel İngilizce",
          classType: "5-8 Kişilik",
          startLevel: "A1",
          activeLevel: "A1",
          courseCount: 2,
          lessonCount: 80,
          duration: "HİÇ-ÇÇ",
          status: "Aktif",
          totalAmount: 50.0,
          paymentAmount: 50.0,
          debt: 0,
          discount: 0,
          installmentCount: 1,
        },
      ]);

      setStudentNotes([
        {
          id: "1",
          noteDate: "2014-09-28 00:00",
          loginName: "demo",
          noteType: "Öneri",
          noteContent: "Denemedir",
          processDate: "2014-09-14",
          isCompleted: false,
        },
      ]);

      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSave = () => {
    // API call to save student data
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("student_not_found")}
          </h2>
          <p className="text-gray-600">{t("student_not_found_description")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <FaPlus className="w-4 h-4 mr-2" />
              {t("new")}
            </Button>
            <Button variant="outline" size="sm">
              <FaSave className="w-4 h-4 mr-2" />
              {t("save")}
            </Button>
            <Button variant="outline" size="sm">
              <FaTrash className="w-4 h-4 mr-2" />
              {t("delete")}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">ÖZLEM ÖZTÜRK</span>
            <span className="text-sm text-gray-400">
              Fotoğraf [jpeg, gif (4Mb)]
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Student Info */}
        <div className="col-span-9">
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Top Row - Basic Info */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("student_number")}
                  </Label>
                  <Input
                    value={student.studentNumber}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("registration_date")}
                  </Label>
                  <Input
                    type="date"
                    value={student.registrationDate}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("branch")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={student.branch} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="merkez">Merkez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("registration_group")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Bireysel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bireysel">Bireysel</SelectItem>
                      <SelectItem value="kurumsal">Kurumsal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("full_name")}
                  </Label>
                  <Input
                    value={student.fullName}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("source")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={student.source} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referans">REFERANS</SelectItem>
                      <SelectItem value="internet">İNTERNET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("company_name")}
                  </Label>
                  <Input
                    value={student.companyName || ""}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("phone1")}
                  </Label>
                  <div className="flex mt-1">
                    <Input
                      value="90"
                      disabled={!isEditing}
                      className="w-16 mr-2"
                    />
                    <Input
                      value={student.phone1 || ""}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("interest_area")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={student.interestArea} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kisisel-gelisim">
                        Kişisel Gelişim
                      </SelectItem>
                      <SelectItem value="dil-egitimi">Dil Eğitimi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("source_location")}
                  </Label>
                  <Input
                    value={student.sourceLocation}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("phone2")}
                  </Label>
                  <div className="flex mt-1">
                    <Input
                      value="90"
                      disabled={!isEditing}
                      className="w-16 mr-2"
                    />
                    <Input
                      value={student.phone2 || ""}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("follow_up_program")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Genel İngilizce" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genel-ingilizce">
                        Genel İngilizce
                      </SelectItem>
                      <SelectItem value="is-ingilizcesi">
                        İş İngilizcesi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("web_portal")}
                  </Label>
                  <div className="flex items-center mt-1">
                    <Input
                      value={student.webPortal || ""}
                      disabled={!isEditing}
                      className="flex-1 mr-2"
                    />
                    <Button variant="outline" size="sm">
                      <FaEdit className="w-4 h-4" />
                    </Button>
                    <Checkbox className="ml-2" />
                    <span className="ml-1 text-sm">{t("blacklist")}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("follow_up_time")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={student.followUpTime} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="haftaici">Haftaiçi</SelectItem>
                      <SelectItem value="haftasonu">Haftasonu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("contact_level")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={student.contactLevel} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">A1</SelectItem>
                      <SelectItem value="a2">A2</SelectItem>
                      <SelectItem value="b1">B1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fifth Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("level_assessment_teacher")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="AYDIN DUMAN DRAMA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aydin-duman">
                        AYDIN DUMAN DRAMA
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("assessed_level")}
                  </Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="A1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">A1</SelectItem>
                      <SelectItem value="a2">A2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    {t("level_assessment_score")}
                  </Label>
                  <Input
                    type="number"
                    value={student.contactScore}
                    disabled={!isEditing}
                    className="mt-1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700">
                  {t("description")}
                </Label>
                <Textarea disabled={!isEditing} className="mt-1" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="interviews"
                className="bg-blue-100 text-blue-800"
              >
                {t("interview_list")}
              </TabsTrigger>
              <TabsTrigger
                value="programs"
                className="bg-blue-100 text-blue-800"
              >
                {t("program_list")}
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="bg-blue-100 text-blue-800"
              >
                {t("general_info")}
              </TabsTrigger>
              <TabsTrigger value="notes" className="bg-blue-100 text-blue-800">
                {t("comment_list")}
              </TabsTrigger>
            </TabsList>

            {/* Interview List Tab */}
            <TabsContent value="interviews" className="mt-4">
              <Card>
                <CardHeader className="bg-blue-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-800">
                      {t("interview_list")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FaPlus className="w-4 h-4 mr-2" />
                        {t("new")}
                      </Button>
                      <Button size="sm" variant="outline">
                        <FaTrash className="w-4 h-4 mr-2" />
                        {t("delete")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("edit")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Checkbox />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("serial_number")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("interview_date")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("interviewer")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("branch")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("interview_type")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("interview_result")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("next_call_date")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("update_date")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("updated_by")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {interviews.map((interview, index) => (
                          <tr key={interview.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Checkbox />
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                              <Button variant="link" size="sm" className="p-0">
                                {t("edit")}
                              </Button>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.serialNumber}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.interviewDate}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.interviewer}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.branch}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.interviewType}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.interviewResult}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {interview.nextCallDate || "-"}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              -
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              -
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {interviews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {t("no_interviews_found")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Program List Tab */}
            <TabsContent value="programs" className="mt-4">
              <Card>
                <CardHeader className="bg-blue-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-800">
                      {t("program_list")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FaPlus className="w-4 h-4 mr-2" />
                        {t("new")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("search")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("assignments")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("levels")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("planning")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("transfer")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("statistics")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("passive")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("share_sales")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("sales_transfer")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            <Checkbox />
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            #
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("dossier")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("interviewer")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("registration_date")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("registration_type")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("program_name")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("class_type")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("start_level")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("active_level")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("course")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("lesson")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("duration")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("status")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("total_amount")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("payment")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("debt")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("discount")}
                          </th>
                          <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            {t("installment")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {programSales.map((program) => (
                          <tr key={program.id} className="hover:bg-gray-50">
                            <td className="px-2 py-2 whitespace-nowrap">
                              <Checkbox />
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-blue-600">
                              <Button variant="link" size="sm" className="p-0">
                                {t("edit")}
                              </Button>
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.dossier}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.interviewer}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.registrationDate}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.registrationType}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.programName}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.classType}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.startLevel}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.activeLevel}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.courseCount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.lessonCount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.duration}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.status}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.totalAmount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.paymentAmount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.debt}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.discount}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                              {program.installmentCount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* General Info Tab */}
            <TabsContent value="general" className="mt-4">
              <Card>
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-blue-800">
                    {t("general_info")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Temel Bilgiler */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-100 p-2">
                        {t("basic_info")}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("start_date")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("portfolio")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("learning_status")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("school")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("department")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("class")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("home_phone")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              value="90"
                              disabled={!isEditing}
                              className="w-16 mr-2"
                            />
                            <Input disabled={!isEditing} className="flex-1" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("country")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder={student.country} />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("city")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("district")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("neighborhood")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("home_address")}
                          </Label>
                          <Textarea
                            value={student.homeAddress || ""}
                            disabled={!isEditing}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("tax_office")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("tax_number")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Nüfus Bilgileri */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-100 p-2">
                        {t("population_info")}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("tc_number")}
                          </Label>
                          <Input
                            value={student.tcNumber || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("gender")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder={student.gender || ""} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bay">Bay</SelectItem>
                              <SelectItem value="bayan">Bayan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("birth_date")}
                          </Label>
                          <Input
                            type="date"
                            value={student.birthDate || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("birth_place")}
                          </Label>
                          <Input
                            value={student.birthPlace || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("new_id_number")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("passport_number")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("certificate_number")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("hes_code")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              disabled={!isEditing}
                              className="flex-1 mr-2"
                            />
                            <Button variant="outline" size="sm">
                              {t("validity")}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("blood_group")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("mother_name")}
                          </Label>
                          <Input
                            value={student.motherName || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("mother_phone")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              value="90"
                              disabled={!isEditing}
                              className="w-16 mr-2"
                            />
                            <Input
                              value={student.motherPhone || ""}
                              disabled={!isEditing}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("mother_email")}
                          </Label>
                          <Input
                            value={student.motherEmail || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("father_name")}
                          </Label>
                          <Input
                            value={student.fatherName || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("father_phone")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              value="90"
                              disabled={!isEditing}
                              className="w-16 mr-2"
                            />
                            <Input
                              value={student.fatherPhone || ""}
                              disabled={!isEditing}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("father_email")}
                          </Label>
                          <Input
                            value={student.fatherEmail || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* İş Bilgileri */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-100 p-2">
                        {t("work_info")}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("birth_date")}
                          </Label>
                          <Input
                            type="date"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("birth_place")}
                          </Label>
                          <Input disabled={!isEditing} className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("sector")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("profession")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("company_name")}
                          </Label>
                          <Input
                            value={student.companyName || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("city")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("district")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("neighborhood")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("work_phone")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              value="90"
                              disabled={!isEditing}
                              className="w-16 mr-2"
                            />
                            <Input
                              value={student.workPhone || ""}
                              disabled={!isEditing}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("work_fax")}
                          </Label>
                          <div className="flex mt-1">
                            <Input
                              value="90"
                              disabled={!isEditing}
                              className="w-16 mr-2"
                            />
                            <Input
                              value={student.workFax || ""}
                              disabled={!isEditing}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("country")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder={student.country} />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("city")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("district")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("neighborhood")}
                          </Label>
                          <Select disabled={!isEditing}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("work_address")}
                          </Label>
                          <Textarea
                            value={student.workAddress || ""}
                            disabled={!isEditing}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("tax_office")}
                          </Label>
                          <Input
                            value={student.taxOffice || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            {t("tax_number")}
                          </Label>
                          <Input
                            value={student.taxNumber || ""}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader className="bg-blue-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-800">
                      {t("comment_list")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FaPlus className="w-4 h-4 mr-2" />
                        {t("new")}
                      </Button>
                      <Button size="sm" variant="outline">
                        <FaTrash className="w-4 h-4 mr-2" />
                        {t("delete")}
                      </Button>
                      <Button size="sm" variant="outline">
                        {t("edit")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Checkbox />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("date")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("login_name")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("type")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("description")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("process_date")}
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("agenda")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {studentNotes.map((note) => (
                          <tr key={note.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Checkbox />
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">
                              <Button variant="link" size="sm" className="p-0">
                                {t("edit")}
                              </Button>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {note.noteDate}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {note.loginName}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {note.noteType}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {note.noteContent}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {note.processDate}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Checkbox checked={note.isCompleted} disabled />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {studentNotes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {t("no_notes_found")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Photo and Communication */}
        <div className="col-span-3">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={student.photoUrl || undefined} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(student.fullName)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  {t("change_photo")}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={student.communicationApproval}
                    disabled={!isEditing}
                  />
                  <span className="text-sm">{t("communication_approval")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={student.mobileAppUsage}
                    disabled={!isEditing}
                  />
                  <span className="text-sm">{t("mobile_app_usage")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{t("quick_actions")}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FaPhone className="w-4 h-4 mr-2" />
                  {t("call_student")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  {t("send_email")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FaRegComment className="w-4 h-4 mr-2" />
                  {t("send_sms")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FaCalendar className="w-4 h-4 mr-2" />
                  {t("schedule_meeting")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 right-6 flex space-x-2">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <FaSave className="w-4 h-4 mr-2" />
              {t("save")}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              {t("cancel")}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <FaEdit className="w-4 h-4 mr-2" />
            {t("edit")}
          </Button>
        )}
      </div>
    </div>
  );
};
