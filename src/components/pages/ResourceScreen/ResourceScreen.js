import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../UI/Text/Text';
import { Colors } from '../../../styles/colors';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps-outline' },
  { id: 'articles', label: 'Articles', icon: 'document-text-outline' },
  { id: 'videos', label: 'Videos', icon: 'play-circle-outline' },
  { id: 'courses', label: 'Courses', icon: 'school-outline' },
  { id: 'guides', label: 'Guides', icon: 'map-outline' },
];

const FEATURED_RESOURCES = [
  {
    id: 'f1',
    title: 'Nurturing Intelligence in Early Childhood',
    author: 'Dr. Sarah Chen',
    type: 'Article',
    duration: '8 min read',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    color: '#4F46E5',
  },
  {
    id: 'f2',
    title: 'Effective Positive Discipline Techniques',
    author: 'James Wilson',
    type: 'Video',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800',
    color: '#0891B2',
  },
];

const ALL_RESOURCES = [
  {
    id: '1',
    title: 'Building Emotional Resilience',
    category: 'guides',
    type: 'Guide',
    duration: '12 min',
    icon: 'heart-outline',
    color: '#EC4899',
  },
  {
    id: '2',
    title: 'Language Development Milestones',
    category: 'articles',
    type: 'Article',
    duration: '6 min',
    icon: 'chatbubbles-outline',
    color: '#8B5CF6',
  },
  {
    id: '3',
    title: 'Social Skills for Preschoolers',
    category: 'videos',
    type: 'Video',
    duration: '10 min',
    icon: 'people-outline',
    color: '#F59E0B',
  },
  {
    id: '4',
    title: 'Creative Play & Brain Growth',
    category: 'courses',
    type: 'Course',
    duration: '4 Modules',
    icon: 'color-palette-outline',
    color: '#10B981',
  },
];

const ResourceScreenPage = () => {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <CustomText variant="display-sm" weight="bold">Resources</CustomText>
          <CustomText variant="body-sm" color={Colors.text.secondary}>Expert parenting insights</CustomText>
        </View>
        <TouchableOpacity style={styles.bookmarkBtn}>
          <Ionicons name="bookmark-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.text.light} />
          <TextInput
            placeholder="Search resources..."
            placeholderTextColor={Colors.text.light}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* CATEGORIES */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesWrapper}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                activeCategory === cat.id && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Ionicons 
                name={cat.icon} 
                size={18} 
                color={activeCategory === cat.id ? Colors.white : Colors.text.secondary} 
              />
              <CustomText
                variant="label-sm"
                weight="bold"
                style={{ marginLeft: 8 }}
                color={activeCategory === cat.id ? Colors.white : Colors.text.secondary}
              >
                {cat.label}
              </CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FEATURED */}
        <View style={styles.sectionHeader}>
          <CustomText variant="headline" weight="bold">Featured</CustomText>
          <TouchableOpacity>
            <CustomText variant="label-sm" color={Colors.primary} weight="bold">View All</CustomText>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.featuredContent}
        >
          {FEATURED_RESOURCES.map((item) => (
            <TouchableOpacity key={item.id} style={styles.featuredCard}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.featuredOverlay}>
                <View style={[styles.typeBadge, { backgroundColor: item.color }]}>
                  <CustomText variant="label-xs" weight="bold" color="white">{item.type}</CustomText>
                </View>
                <View>
                  <CustomText variant="body" weight="bold" color="white" numberOfLines={2}>
                    {item.title}
                  </CustomText>
                  <CustomText variant="label-sm" color="rgba(255,255,255,0.8)" style={{ marginTop: 4 }}>
                    {item.author} • {item.duration}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RECENT / ALL */}
        <View style={styles.sectionHeader}>
          <CustomText variant="headline" weight="bold">All Resources</CustomText>
        </View>

        <View style={styles.resourceList}>
          {ALL_RESOURCES.map((item) => (
            <TouchableOpacity key={item.id} style={styles.resourceItem}>
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.resourceDetails}>
                <CustomText variant="body" weight="bold">{item.title}</CustomText>
                <View style={styles.resourceMeta}>
                  <CustomText variant="label-sm" color={Colors.text.secondary}>{item.type}</CustomText>
                  <View style={styles.dot} />
                  <CustomText variant="label-sm" color={Colors.text.secondary}>{item.duration}</CustomText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.surface_container_highest} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bookmarkBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: Colors.text.primary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  categoriesWrapper: {
    marginTop: 16,
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.surface_container,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredContent: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 32,
  },
  featuredCard: {
    width: width * 0.75,
    height: 180,
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'space-between',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resourceList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 20,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  resourceDetails: {
    flex: 1,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.text.light,
    marginHorizontal: 8,
  },
});

export default ResourceScreenPage;
