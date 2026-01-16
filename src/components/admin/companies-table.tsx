'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
} from '@heroui/react';
import {
  getCompaniesAction,
  getCategoriesAction,
  Company,
  createCompanyAction,
  updateCompanyAction,
  deleteCompanyAction,
  markWhatsAppSentAction,
  sendBulkWhatsAppAction,
} from '@/app/actions/companies';

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // Modals
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isWhatsAppOpen,
    onOpen: onWhatsAppOpen,
    onClose: onWhatsAppClose,
  } = useDisclosure();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    email: '',
    notes: '',
  });
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [companiesResult, categoriesResult] = await Promise.all([
        getCompaniesAction(),
        getCategoriesAction(),
      ]);

      if (companiesResult.success && companiesResult.data) {
        setCompanies(companiesResult.data);
      } else {
        setError(companiesResult.error || 'Не удалось загрузить компании');
      }

      if (categoriesResult.success && categoriesResult.data) {
        setCategories(categoriesResult.data);
      }
    } catch (err) {
      setError('Ошибка загрузки данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async () => {
    if (!formData.name || !formData.phone || !formData.category) {
      setError('Имя, телефон и категория обязательны');
      return;
    }

    const result = await createCompanyAction({
      name: formData.name,
      phone: formData.phone,
      category: formData.category,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
    });

    if (result.success) {
      onAddClose();
      setFormData({ name: '', phone: '', category: '', email: '', notes: '' });
      loadData();
    } else {
      setError(result.error || 'Не удалось создать компанию');
    }
  };

  const handleEditCompany = async () => {
    if (!editingCompany) return;

    const result = await updateCompanyAction(editingCompany.id, {
      name: formData.name,
      phone: formData.phone,
      category: formData.category,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
    });

    if (result.success) {
      onEditClose();
      setEditingCompany(null);
      setFormData({ name: '', phone: '', category: '', email: '', notes: '' });
      loadData();
    } else {
      setError(result.error || 'Не удалось обновить компанию');
    }
  };

  const handleDeleteCompany = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту компанию?')) return;

    const result = await deleteCompanyAction(id);
    if (result.success) {
      loadData();
    } else {
      setError(result.error || 'Не удалось удалить компанию');
    }
  };

  const handleOpenEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      phone: company.phone,
      category: company.category,
      email: company.email || '',
      notes: company.notes || '',
    });
    onEditOpen();
  };

  const handleSendWhatsApp = async (company: Company) => {
    const phone = company.phone.replace(/\D/g, ''); // Remove non-digits
    const message = encodeURIComponent(whatsappMessage || 'Здравствуйте!');
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Mark as sent
    await markWhatsAppSentAction(company.id);
    loadData();
  };

  const handleBulkWhatsApp = async () => {
    if (selectedCompanies.length === 0) {
      setError('Пожалуйста, выберите хотя бы одну компанию');
      return;
    }

    if (!whatsappMessage.trim()) {
      setError('Пожалуйста, введите сообщение');
      return;
    }

    // Mark as sent in database
    await sendBulkWhatsAppAction(selectedCompanies, whatsappMessage);

    // Open WhatsApp for each company
    const companiesToSend = companies.filter((c) =>
      selectedCompanies.includes(c.id)
    );
    companiesToSend.forEach((company, index) => {
      setTimeout(() => {
        const phone = company.phone.replace(/\D/g, '');
        const message = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
      }, index * 500); // Delay to avoid popup blockers
    });

    onWhatsAppClose();
    setSelectedCompanies([]);
    setWhatsappMessage('');
    loadData();
  };

  const toggleCompanySelection = (id: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const toggleAllCompanies = () => {
    const filtered = filteredCompanies;
    if (selectedCompanies.length === filtered.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(filtered.map((c) => c.id));
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Никогда';
    return new Date(date).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredCompanies = companies.filter((company) => {
    if (selectedCategory === 'all') return true;
    return company.category === selectedCategory;
  });

  const columns = [
    { key: 'select', label: '' },
    { key: 'name', label: 'Название' },
    { key: 'phone', label: 'Телефон' },
    { key: 'category', label: 'Категория' },
    { key: 'email', label: 'Email' },
    { key: 'whatsapp_sent', label: 'WhatsApp отправлен' },
    { key: 'last_message_date', label: 'Последнее сообщение' },
    { key: 'actions', label: 'Действия' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="companies-table">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Управление компаниями</h2>
        <div className="flex gap-2">
          <Button color="primary" onPress={onAddOpen}>
            Добавить компанию
          </Button>
          {selectedCompanies.length > 0 && (
            <Button color="success" onPress={onWhatsAppOpen}>
              Отправить WhatsApp ({selectedCompanies.length})
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="mb-4">
        <Select
          label="Фильтр по категории"
          selectedKeys={new Set([selectedCategory])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setSelectedCategory(selected);
            setSelectedCompanies([]);
          }}
          items={[
            { key: 'all', label: 'Все категории' },
            ...categories.map((cat) => ({ key: cat, label: cat })),
          ]}
        >
          {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
      </div>

      <Table aria-label="Таблица компаний">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>
              {column.key === 'select' ? (
                <Checkbox
                  isSelected={
                    selectedCompanies.length === filteredCompanies.length &&
                    filteredCompanies.length > 0
                  }
                  isIndeterminate={
                    selectedCompanies.length > 0 &&
                    selectedCompanies.length < filteredCompanies.length
                  }
                  onValueChange={toggleAllCompanies}
                />
              ) : (
                column.label
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Checkbox
                  isSelected={selectedCompanies.includes(company.id)}
                  onValueChange={() => toggleCompanySelection(company.id)}
                />
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.phone}</TableCell>
              <TableCell>
                <Chip color="primary" variant="flat">
                  {company.category}
                </Chip>
              </TableCell>
              <TableCell>{company.email || '-'}</TableCell>
              <TableCell>
                <Chip color={company.whatsapp_sent ? 'success' : 'default'}>
                  {company.whatsapp_sent ? 'Да' : 'Нет'}
                </Chip>
              </TableCell>
              <TableCell>{formatDate(company.last_message_date)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => handleOpenEdit(company)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    onPress={() => {
                      setWhatsappMessage(
                        'Здравствуйте! Мы хотели бы предложить вам наши услуги.'
                      );
                      handleSendWhatsApp(company);
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => handleDeleteCompany(company.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Company Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalContent>
          <ModalHeader>Добавить компанию</ModalHeader>
          <ModalBody>
            <Input
              label="Название компании"
              value={formData.name}
              onValueChange={(value) =>
                setFormData({ ...formData, name: value })
              }
              isRequired
            />
            <Input
              label="Телефон"
              value={formData.phone}
              onValueChange={(value) =>
                setFormData({ ...formData, phone: value })
              }
              isRequired
            />
            <Input
              label="Категория"
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              isRequired
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onValueChange={(value) =>
                setFormData({ ...formData, email: value })
              }
            />
            <Textarea
              label="Заметки"
              value={formData.notes}
              onValueChange={(value) =>
                setFormData({ ...formData, notes: value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onAddClose}>
              Отмена
            </Button>
            <Button color="primary" onPress={handleAddCompany}>
              Добавить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Company Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalContent>
          <ModalHeader>Редактировать компанию</ModalHeader>
          <ModalBody>
            <Input
              label="Название компании"
              value={formData.name}
              onValueChange={(value) =>
                setFormData({ ...formData, name: value })
              }
              isRequired
            />
            <Input
              label="Телефон"
              value={formData.phone}
              onValueChange={(value) =>
                setFormData({ ...formData, phone: value })
              }
              isRequired
            />
            <Input
              label="Категория"
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              isRequired
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onValueChange={(value) =>
                setFormData({ ...formData, email: value })
              }
            />
            <Textarea
              label="Заметки"
              value={formData.notes}
              onValueChange={(value) =>
                setFormData({ ...formData, notes: value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onEditClose}>
              Отмена
            </Button>
            <Button color="primary" onPress={handleEditCompany}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* WhatsApp Bulk Send Modal */}
      <Modal isOpen={isWhatsAppOpen} onClose={onWhatsAppClose} size="2xl">
        <ModalContent>
          <ModalHeader>Отправить сообщение WhatsApp</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-600 mb-4">
              Отправка {selectedCompanies.length} компаниям
            </p>
            <Textarea
              label="Сообщение"
              placeholder="Введите ваше сообщение WhatsApp..."
              value={whatsappMessage}
              onValueChange={setWhatsappMessage}
              minRows={5}
              isRequired
            />
            <p className="text-xs text-gray-500 mt-2">
              Примечание: Это откроет WhatsApp Web/App для каждой выбранной
              компании. Убедитесь, что всплывающие окна включены.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onWhatsAppClose}>
              Отмена
            </Button>
            <Button color="success" onPress={handleBulkWhatsApp}>
              Отправить ({selectedCompanies.length})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
